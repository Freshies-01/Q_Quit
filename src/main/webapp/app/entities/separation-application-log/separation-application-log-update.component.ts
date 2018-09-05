import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";
import { SeparationApplicationLogService } from "./separation-application-log.service";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { SeparationApplicationService } from "app/entities/separation-application";

@Component({
  selector: "jhi-separation-application-log-update",
  templateUrl: "./separation-application-log-update.component.html"
})
export class SeparationApplicationLogUpdateComponent implements OnInit {
  private _separationApplicationLog: ISeparationApplicationLog;
  isSaving: boolean;

  employees: IEmployee[];

  separationapplications: ISeparationApplication[];
  dateEditedDp: any;

  constructor(
    private jhiAlertService: JhiAlertService,
    private separationApplicationLogService: SeparationApplicationLogService,
    private employeeService: EmployeeService,
    private separationApplicationService: SeparationApplicationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ separationApplicationLog }) => {
      this.separationApplicationLog = separationApplicationLog;
    });
    this.employeeService
      .query({ filter: "separationapplicationlog-is-null" })
      .subscribe(
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
      .query({ filter: "separationapplicationlog-is-null" })
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
