import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { IAction } from "app/shared/model/action.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ActionService } from "app/entities/action/action.service";
import { Observable } from "rxjs";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";
import { JhiEventManager } from "ng-jhipster";

@Component({
  selector: "jhi-action-list",
  templateUrl: "./action-list.component.html",
  styleUrls: ["./action-list.component.css"],
  providers: [SeparationApplicationService]
})
export class ActionListComponent implements OnInit {
  actions: IAction[];
  private _action: IAction;
  functionRep: IFunctionReps;
  @Input() saId: number;
  isSaving: boolean;
  separationApplication: ISeparationApplication;

  public actionForm = new FormGroup({
    id: new FormControl(""),
    task: new FormControl("")
  });

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private actionService: ActionService,
    private functionRepsService: FunctionRepsService,
    private eventManager: JhiEventManager
  ) {}

  loadActions() {
    this.separationApplicationService.queryActions(this.saId).subscribe(
      (res: HttpResponse<IAction[]>) => {
        this.actions = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadFr() {
    this.functionRepsService.findCurrentFunctionRep().subscribe(
      (res: HttpResponse<IFunctionReps>) => {
        this.functionRep = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  getApp() {
    this.separationApplicationService.find(this.saId).subscribe(
      (res: HttpResponse<ISeparationApplication>) => {
        this.separationApplication = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  save() {
    if (this.actionForm.get("task").value === "" || null) {
      return;
    }
    const action: IAction = this.actionForm.getRawValue();
    this.actionForm.reset();
    action.id = undefined;
    action.isCompleted = false;
    action.separationApplication = this.separationApplication;
    action.separationApplication.id = this.saId;
    action.functionReps = this.functionRep;
    this.isSaving = true;
    if (action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(action));
    }
  }

  update(action: IAction) {
    action.isCompleted = !action.isCompleted;
    if (action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(action));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>) {
    result.subscribe(
      (res: HttpResponse<IAction>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.loadActions();
  }

  private onSaveError() {
    this.isSaving = false;
    this.loadActions();
  }

  confirmDelete(id: number) {
    this.actionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: "actionListModification",
        content: "Deleted an action"
      });
      this.loadActions();
    });
  }

  ngOnInit() {
    this.loadActions();
    this.loadFr();
    this.getApp();
  }
}
