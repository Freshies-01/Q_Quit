import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";
import { SeparationApplicationLogService } from "app/entities/separation-application-log/separation-application-log.service";
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
  selector: "jhi-separation-application-log-update",
  templateUrl: "./separation-application-log-update.component.html"
})
export class SeparationApplicationLogUpdateComponent implements OnInit {
  private _separationApplicationLog: ISeparationApplicationLog;
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
    private separationApplicationLogService: SeparationApplicationLogService,
    private employeeService: EmployeeService,
    private actionService: ActionService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private separationApplicationService: SeparationApplicationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ separationApplicationLog }) => {
      this.separationApplicationLog = separationApplicationLog;
    });
    this.employeeService.query({ filter: "log-is-null" }).subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        if (
          !this.separationApplicationLog.editor ||
          !this.separationApplicationLog.editor.id
        ) {
          this.editors = res.body;
        } else {
          this.employeeService
            .find(this.separationApplicationLog.editor.id)
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
          !this.separationApplicationLog.action ||
          !this.separationApplicationLog.action.id
        ) {
          this.actions = res.body;
        } else {
          this.actionService
            .find(this.separationApplicationLog.action.id)
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
          !this.separationApplicationLog.hrReps ||
          !this.separationApplicationLog.hrReps.id
        ) {
          this.hrreps = res.body;
        } else {
          this.hrRepsService
            .find(this.separationApplicationLog.hrReps.id)
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
          !this.separationApplicationLog.functionReps ||
          !this.separationApplicationLog.functionReps.id
        ) {
          this.functionreps = res.body;
        } else {
          this.functionRepsService
            .find(this.separationApplicationLog.functionReps.id)
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
          !this.separationApplicationLog.employee ||
          !this.separationApplicationLog.employee.id
        ) {
          this.employees = res.body;
        } else {
          this.employeeService
            .find(this.separationApplicationLog.employee.id)
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
            !this.separationApplicationLog.separationApplication ||
            !this.separationApplicationLog.separationApplication.id
          ) {
            this.separationapplications = res.body;
          } else {
            this.separationApplicationService
              .find(this.separationApplicationLog.separationApplication.id)
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
    if (this.separationApplicationLog.id !== undefined) {
      this.subscribeToSaveResponse(
        this.separationApplicationLogService.update(
          this.separationApplicationLog
        )
      );
    } else {
      this.subscribeToSaveResponse(
        this.separationApplicationLogService.create(
          this.separationApplicationLog
        )
      );
    }
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<ISeparationApplicationLog>>
  ) {
    result.subscribe(
      (res: HttpResponse<ISeparationApplicationLog>) => this.onSaveSuccess(),
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
  get separationApplicationLog() {
    return this._separationApplicationLog;
  }

  set separationApplicationLog(
    separationApplicationLog: ISeparationApplicationLog
  ) {
    this._separationApplicationLog = separationApplicationLog;
  }
}
