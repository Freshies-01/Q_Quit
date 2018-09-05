import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { ISepartationApplicationLog } from "app/shared/model/separtation-application-log.model";
import { SepartationApplicationLogService } from "./separtation-application-log.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { SeparationApplicationService } from "app/entities/separation-application";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";

@Component({
  selector: "jhi-separtation-application-log-update",
  templateUrl: "./separtation-application-log-update.component.html"
})
export class SepartationApplicationLogUpdateComponent implements OnInit {
  private _separtationApplicationLog: ISepartationApplicationLog;
  isSaving: boolean;

  separationapplications: ISeparationApplication[];

  employees: IEmployee[];
  dateEditedDp: any;

  constructor(
    private jhiAlertService: JhiAlertService,
    private separtationApplicationLogService: SepartationApplicationLogService,
    private separationApplicationService: SeparationApplicationService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ separtationApplicationLog }) => {
      this.separtationApplicationLog = separtationApplicationLog;
    });
    this.separationApplicationService
      .query({ filter: "separtationapplicationlog-is-null" })
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
    this.employeeService
      .query({ filter: "separtationapplicationlog-is-null" })
      .subscribe(
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

  trackSeparationApplicationById(index: number, item: ISeparationApplication) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
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
