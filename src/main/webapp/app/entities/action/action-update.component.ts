import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { IAction } from "app/shared/model/action.model";
import { ActionService } from "./action.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { SeparationApplicationService } from "app/entities/separation-application";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";

@Component({
  selector: "jhi-action-update",
  templateUrl: "./action-update.component.html"
})
export class ActionUpdateComponent implements OnInit {
  private _action: IAction;
  isSaving: boolean;

  separationapplications: ISeparationApplication[];

  functionreps: IFunctionReps[];
  dateCompletedDp: any;

  constructor(
    private jhiAlertService: JhiAlertService,
    private actionService: ActionService,
    private separationApplicationService: SeparationApplicationService,
    private functionRepsService: FunctionRepsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ action }) => {
      this.action = action;
    });
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationapplications = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.functionRepsService.query().subscribe(
      (res: HttpResponse<IFunctionReps[]>) => {
        this.functionreps = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(this.action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(this.action));
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
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackSeparationApplicationById(index: number, item: ISeparationApplication) {
    return item.id;
  }

  trackFunctionRepsById(index: number, item: IFunctionReps) {
    return item.id;
  }
  get action() {
    return this._action;
  }

  set action(action: IAction) {
    this._action = action;
  }
}
