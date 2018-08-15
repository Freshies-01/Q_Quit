import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { ISepartationApplicationLog } from "app/shared/model/separtation-application-log.model";
import { SepartationApplicationLogService } from "./separtation-application-log.service";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";
import { IAction } from "app/shared/model/action.model";
import { ActionService } from "app/entities/action";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { SeparationApplicationService } from "app/entities/separation-application";

@Component({
  selector: "jhi-separtation-application-log-update",
  templateUrl: "./separtation-application-log-update.component.html"
})
export class SepartationApplicationLogUpdateComponent implements OnInit {
  private _separtationApplicationLog: ISepartationApplicationLog;
  isSaving: boolean;

  editors: IEmployee[];

  actions: IAction[];

  hrreps: IHrReps[];

  functionreps: IFunctionReps[];

  employees: IEmployee[];

  separationapplications: ISeparationApplication[];
  dateApprovedDp: any;
  dateSubmittedDp: any;
  dateCompletedDp: any;
  dateOfLeaveDp: any;
  dateEditedDp: any;

  constructor(
    private jhiAlertService: JhiAlertService,
    private separtationApplicationLogService: SepartationApplicationLogService,
    private employeeService: EmployeeService,
    private actionService: ActionService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private separationApplicationService: SeparationApplicationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ separtationApplicationLog }) => {
      this.separtationApplicationLog = separtationApplicationLog;
    });
    this.employeeService.query({ filter: "log-is-null" }).subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        if (
          !this.separtationApplicationLog.editor ||
          !this.separtationApplicationLog.editor.id
        ) {
          this.editors = res.body;
        } else {
          this.employeeService
            .find(this.separtationApplicationLog.editor.id)
            .subscribe(
              (subRes: HttpResponse<IEmployee>) => {
                this.editors = [subRes.body].concat(res.body);
              },
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.actionService.query({ filter: "log-is-null" }).subscribe(
      (res: HttpResponse<IAction[]>) => {
        if (
          !this.separtationApplicationLog.action ||
          !this.separtationApplicationLog.action.id
        ) {
          this.actions = res.body;
        } else {
          this.actionService
            .find(this.separtationApplicationLog.action.id)
            .subscribe(
              (subRes: HttpResponse<IAction>) => {
                this.actions = [subRes.body].concat(res.body);
              },
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.hrRepsService.query({ filter: "log-is-null" }).subscribe(
      (res: HttpResponse<IHrReps[]>) => {
        if (
          !this.separtationApplicationLog.hrReps ||
          !this.separtationApplicationLog.hrReps.id
        ) {
          this.hrreps = res.body;
        } else {
          this.hrRepsService
            .find(this.separtationApplicationLog.hrReps.id)
            .subscribe(
              (subRes: HttpResponse<IHrReps>) => {
                this.hrreps = [subRes.body].concat(res.body);
              },
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.functionRepsService.query({ filter: "log-is-null" }).subscribe(
      (res: HttpResponse<IFunctionReps[]>) => {
        if (
          !this.separtationApplicationLog.functionReps ||
          !this.separtationApplicationLog.functionReps.id
        ) {
          this.functionreps = res.body;
        } else {
          this.functionRepsService
            .find(this.separtationApplicationLog.functionReps.id)
            .subscribe(
              (subRes: HttpResponse<IFunctionReps>) => {
                this.functionreps = [subRes.body].concat(res.body);
              },
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.employeeService.query({ filter: "log-is-null" }).subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        if (
          !this.separtationApplicationLog.employee ||
          !this.separtationApplicationLog.employee.id
        ) {
          this.employees = res.body;
        } else {
          this.employeeService
            .find(this.separtationApplicationLog.employee.id)
            .subscribe(
              (subRes: HttpResponse<IEmployee>) => {
                this.employees = [subRes.body].concat(res.body);
              },
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.separationApplicationService
      .query({ filter: "log-is-null" })
      .subscribe(
        (res: HttpResponse<ISeparationApplication[]>) => {
          if (
            !this.separtationApplicationLog.separationApplication ||
            !this.separtationApplicationLog.separationApplication.id
          ) {
            this.separationapplications = res.body;
          } else {
            this.separationApplicationService
              .find(this.separtationApplicationLog.separationApplication.id)
              .subscribe(
                (subRes: HttpResponse<ISeparationApplication>) => {
                  this.separationapplications = [subRes.body].concat(res.body);
                },
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.separtationApplicationLog.id !== undefined) {
      this.subscribeToSaveResponse(
        this.separtationApplicationLogService.update(
          this.separtationApplicationLog
        )
      );
    } else {
      this.subscribeToSaveResponse(
        this.separtationApplicationLogService.create(
          this.separtationApplicationLog
        )
      );
    }
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<ISepartationApplicationLog>>
  ) {
    result.subscribe(
      (res: HttpResponse<ISepartationApplicationLog>) => this.onSaveSuccess(),
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

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }

  trackActionById(index: number, item: IAction) {
    return item.id;
  }

  trackHrRepsById(index: number, item: IHrReps) {
    return item.id;
  }

  trackFunctionRepsById(index: number, item: IFunctionReps) {
    return item.id;
  }

  trackSeparationApplicationById(index: number, item: ISeparationApplication) {
    return item.id;
  }
  get separtationApplicationLog() {
    return this._separtationApplicationLog;
  }

  set separtationApplicationLog(
    separtationApplicationLog: ISepartationApplicationLog
  ) {
    this._separtationApplicationLog = separtationApplicationLog;
  }
}
