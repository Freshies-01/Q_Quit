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
    this.employeeService.query().subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        this.employees = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationapplications = res.body;
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
