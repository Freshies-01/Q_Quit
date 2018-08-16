import { Component, OnInit, Optional } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { SeparationApplicationLogService } from "app/entities/separation-application-log/separation-application-log.service";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";
import {
  ISeparationApplicationLog,
  SeparationApplicationLog,
  EditType
} from "app/shared/model/separation-application-log.model";
import { Principal } from "app/core";
import { isMoment } from "moment";
import { NgbDateMomentAdapter } from "app/shared";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

@Component({
  selector: "jhi-separation-application-update",
  templateUrl: "./separation-application-update.component.html"
})
export class SeparationApplicationUpdateComponent implements OnInit {
  private _separationApplication: ISeparationApplication;
  isSaving: boolean;
  employees: IEmployee[];
  hrreps: IHrReps[];
  functionreps: IFunctionReps[];
  dateOfLeaveDp: any;
  dateSumbittedDp: any;
  dateCompletedDp: any;
  dateApprovedDp: any;
  currentAccount: any;
  separationLog: ISeparationApplicationLog;
  today = new Date();
  constructor(
    private principal: Principal,
    private jhiAlertService: JhiAlertService,
    private separationApplicationService: SeparationApplicationService,
    private separationApplicationLogService: SeparationApplicationLogService,
    private employeeService: EmployeeService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ separationApplication }) => {
      this.separationApplication = separationApplication;
    });
    this.employeeService
      .query({ filter: "separationapplication-is-null" })
      .subscribe(
        (res: HttpResponse<IEmployee[]>) => {
          if (
            !this.separationApplication.employee ||
            !this.separationApplication.employee.id
          ) {
            this.employees = res.body;
          } else {
            this.employeeService
              .find(this.separationApplication.employee.id)
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
    this.hrRepsService.query().subscribe(
      (res: HttpResponse<IHrReps[]>) => {
        this.hrreps = res.body;
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
    this.createSeparationLogCreatedSA();
    this.isSaving = true;
    if (this.separationApplication.id !== undefined) {
      this.subscribeToSaveResponse(
        this.separationApplicationService.update(this.separationApplication)
      );
    } else {
      this.subscribeToSaveResponse(
        this.separationApplicationService.create(this.separationApplication)
      );
      this.subscribeToSaveResponseSALog(
        this.separationApplicationLogService.create(this.separationLog)
      );
    }
  }

  createSeparationLogCreatedSA() {
    this.separationLog = new SeparationApplicationLog();
    this.separationLog.editor = this.separationApplication.employee;
    this.separationLog.dateApproved = this.separationApplication.dateApproved;
    this.separationLog.dateCompleted = this.separationApplication.dateCompleted;
    this.separationLog.dateOfLeave = this.separationApplication.dateOfLeave;
    this.separationLog.dateSubmitted = this.separationApplication.dateSumbitted;
    this.separationLog.employee = this.separationApplication.employee;
    this.separationLog.hrReps = this.separationApplication.hr;
    this.separationLog.functionReps = this.separationApplication.fr;
    this.separationLog.separationApplication = this.separationApplication;
    this.separationLog.status = this.separationApplication.status;
    this.separationLog.editType = EditType.CREATE;
    this.separationLog.dateEdited = new NgbDateMomentAdapter().toModel(
      new NgbDate(
        this.today.getFullYear(),
        this.today.getMonth() + 1,
        this.today.getDate()
      )
    );
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<ISeparationApplication>>
  ) {
    result.subscribe(
      (res: HttpResponse<ISeparationApplication>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }
  private subscribeToSaveResponseSALog(
    result: Observable<HttpResponse<ISeparationApplicationLog>>
  ) {
    console.log("subscribe");
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

  trackHrRepsById(index: number, item: IHrReps) {
    return item.id;
  }

  trackFunctionRepsById(index: number, item: IFunctionReps) {
    return item.id;
  }
  get separationApplication() {
    return this._separationApplication;
  }

  set separationApplication(separationApplication: ISeparationApplication) {
    this._separationApplication = separationApplication;
  }
}
