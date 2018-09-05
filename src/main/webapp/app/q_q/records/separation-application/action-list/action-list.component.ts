import { Component, OnInit, Input, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { IAction, ActionStatus } from "app/shared/model/action.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ActionService } from "app/entities/action/action.service";
import { Observable } from "rxjs";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";
import { JhiEventManager } from "ng-jhipster";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface ActionData {
  action: IAction;
}

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

  public actionEditForm = new FormGroup({
    task: new FormControl("")
  });

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private actionService: ActionService,
    private functionRepsService: FunctionRepsService,
    private eventManager: JhiEventManager,
    public dialog: MatDialog
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
    const action: IAction = this.actionForm.getRawValue();
    if (action.task === "" || null) {
      return;
    }
    this.actionForm.reset();
    action.id = undefined;
    action.isCompleted = false;
    action.separationApplication = this.separationApplication;
    action.separationApplication.id = this.saId;
    action.functionReps = this.functionRep;
    this.isSaving = true;
    this.updateAction(action);
  }

  toggleCompleted(action: IAction) {
    action.isCompleted = !action.isCompleted;
    this.updateAction(action);
  }

  updateAction(action: IAction) {
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

  dispute(action: IAction) {
    // increment numDisputes
    // if numDisputes > 2, reveal 'accept', 'delete', and 'edit' button to HR
    // change text of action.task to red
    // disable dispute button
    action.numDisputes++;
    action.actionStatus = ActionStatus.DISPUTED;
  }

  openDialog(action: IAction): void {
    const dialogRef = this.dialog.open(ActionEditPopupComponent, {
      width: "250px",
      height: "600px",
      data: { editedAction: action }
    });
  }

  edit(action: IAction) {
    // set action.task to form value
    // change action.task text color to normal
    // reenable dispute button
    const editAction: IAction = this.actionEditForm.getRawValue();
    if (editAction.task === "" || null || action.task) {
      return;
    }
    // console.log(action.id);
    action.task = editAction.task;
    action.actionStatus = ActionStatus.EDITED;
    this.updateAction(action);
  }

  accept(action: IAction) {
    // set action.task text style to BOLD
    // remove ability to edit this action
    action.numDisputes = 0;
    action.actionStatus = ActionStatus.ACCEPTED;
    this.updateAction(action);
  }

  ngOnInit() {
    this.loadActions();
    this.loadFr();
    this.getApp();
  }
}

@Component({
  selector: "jhi-action-edit-popup",
  templateUrl: "action-edit-popup.html"
})
export class ActionEditPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ActionEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
