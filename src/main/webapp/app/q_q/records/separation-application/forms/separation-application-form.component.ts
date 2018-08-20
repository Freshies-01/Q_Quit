import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";

@Component({
  selector: "jhi-separation-application-form",
  templateUrl: "./separation-application-form.component.html",
  styleUrls: ["./separation-application-form.component.css"]
})
export class SeparationApplicationFormComponent implements OnInit {
  separationApplications: ISeparationApplication[];
  private _separationApplication: ISeparationApplication;
  isSaving: boolean;

  employees: IEmployee[];

  hrreps: IHrReps[];

  functionreps: IFunctionReps[];
  dateOfLeaveDp: any;
  dateSumbittedDp: any;
  dateCompletedDp: any;
  dateApprovedDp: any;

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private jhiAlertService: JhiAlertService,
    private employeeService: EmployeeService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private activatedRoute: ActivatedRoute
  ) {}

  loadAll() {
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
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
  save() {
    this.isSaving = true;
    if (this.separationApplication.id !== undefined) {
      this.subscribeToSaveResponse(
        this.separationApplicationService.update(this.separationApplication)
      );
    } else {
      this.subscribeToSaveResponse(
        this.separationApplicationService.create(this.separationApplication)
      );
    }
  }

  private onSaveSuccess() {
    this.isSaving = false;
    // this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<ISeparationApplication>>
  ) {
    result.subscribe(
      (res: HttpResponse<ISeparationApplication>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
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
