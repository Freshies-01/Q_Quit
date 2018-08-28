import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps/function-reps.service";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";

@Component({
  selector: "jhi-function-reps-update",
  templateUrl: "./function-reps-update.component.html"
})
export class FunctionRepsUpdateComponent implements OnInit {
  private _functionReps: IFunctionReps;
  isSaving: boolean;

  employees: IEmployee[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private functionRepsService: FunctionRepsService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ functionReps }) => {
      this.functionReps = functionReps;
    });
    this.employeeService.query({ filter: "fr-is-null" }).subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        if (!this.functionReps.employee || !this.functionReps.employee.id) {
          this.employees = res.body;
        } else {
          this.employeeService.find(this.functionReps.employee.id).subscribe(
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
    if (this.functionReps.id !== undefined) {
      this.subscribeToSaveResponse(
        this.functionRepsService.update(this.functionReps)
      );
    } else {
      this.subscribeToSaveResponse(
        this.functionRepsService.create(this.functionReps)
      );
    }
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<IFunctionReps>>
  ) {
    result.subscribe(
      (res: HttpResponse<IFunctionReps>) => this.onSaveSuccess(),
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
  get functionReps() {
    return this._functionReps;
  }

  set functionReps(functionReps: IFunctionReps) {
    this._functionReps = functionReps;
  }
}
