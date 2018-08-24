import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";

import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "jhi-separation-application-form",
  templateUrl: "./separation-application-form.component.html",
  styleUrls: ["./separation-application-form.component.css"]
})
export class SeparationApplicationFormComponent implements OnInit {
  isSaving = false;

  // 3 variables here are populated so that the drowpdown can have data.  I would like to extract the drowpdown for these into a pop up component sometime.
  employeeOptions: IEmployee[];
  hrRepOptions: IHrReps[];
  functionRepOptions: IFunctionReps[];

  // The form group represents structure of the JSON we get from API.
  // This allows us to avoid writting a lot of custom partsing/serializing function,
  // By just leting us yse appForm.getRawValues()
  // We still have to do some of it... for example, converting separation applications gives us momment object, but we need to convert it to date
  public appForm = new FormGroup({
    id: new FormControl(""),
    status: new FormControl(""),
    dateOfLeave: new FormControl(""),
    dateApproved: new FormControl(""),
    fr: new FormGroup({
      id: new FormControl("")
    }),
    hr: new FormGroup({
      id: new FormControl("")
    }),
    employee: new FormGroup({
      id: new FormControl("")
    })
  });

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private jhiAlertService: JhiAlertService,
    private employeeService: EmployeeService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(routeData => {
      const sa: SeparationApplication = routeData.separationApplication;
      this.populateFormWithData(sa);
    });
    this.populateFrOptions();
    this.populateHrOptions();
  }

  populateFormWithData(sa: SeparationApplication) {
    // JHipster uses external lib called momment to manage dates.
    // I am converting momment objects to Date object because ngMAterial' date picker expects that.
    // There is a way to make date component work with momment... but it's more trouble than it's worth it now
    const adjustedSA: any = sa;
    adjustedSA.dateOfLeave = sa.dateOfLeave.toDate();
    adjustedSA.dateApproved = sa.dateApproved.toDate();
    this.appForm.patchValue(adjustedSA);
  }

  populateFrOptions() {
    this.functionRepsService.query().subscribe(
      (res: HttpResponse<IFunctionReps[]>) => {
        this.functionRepOptions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  populateHrOptions() {
    this.hrRepsService.query().subscribe(
      (res: HttpResponse<IHrReps[]>) => {
        this.hrRepOptions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  populateEmployeeOptions() {
    this.employeeService
      .query({ filter: "separationapplication-is-null" })
      .subscribe(
        (res: HttpResponse<IEmployee[]>) => {
          this.employeeOptions = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  save() {
    this.isSaving = true;
    // DEBUG: Rememmber that we converted memment objects to date... can we pass date into momment here?
    const sa = this.appForm.getRawValue() as SeparationApplication;
    if (this.appForm.get("id").value() !== undefined) {
      this.subscribeToSaveResponse(
        this.separationApplicationService.update(sa)
      );
    } else {
      this.subscribeToSaveResponse(
        this.separationApplicationService.create(sa)
      );
    }
  }

  private onSaveSuccess() {
    this.isSaving = false;
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
}
