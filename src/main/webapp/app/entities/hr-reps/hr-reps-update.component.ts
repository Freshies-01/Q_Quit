import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps/hr-reps.service";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";

@Component({
  selector: "jhi-hr-reps-update",
  templateUrl: "./hr-reps-update.component.html"
})
export class HrRepsUpdateComponent implements OnInit {
  private _hrReps: IHrReps;
  isSaving: boolean;

  employees: IEmployee[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private hrRepsService: HrRepsService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ hrReps }) => {
      this.hrReps = hrReps;
    });
    this.employeeService.query({ filter: "hr-is-null" }).subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        if (!this.hrReps.employee || !this.hrReps.employee.id) {
          this.employees = res.body;
        } else {
          this.employeeService.find(this.hrReps.employee.id).subscribe(
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
    if (this.hrReps.id !== undefined) {
      this.subscribeToSaveResponse(this.hrRepsService.update(this.hrReps));
    } else {
      this.subscribeToSaveResponse(this.hrRepsService.create(this.hrReps));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IHrReps>>) {
    result.subscribe(
      (res: HttpResponse<IHrReps>) => this.onSaveSuccess(),
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
  get hrReps() {
    return this._hrReps;
  }

  set hrReps(hrReps: IHrReps) {
    this._hrReps = hrReps;
  }
}
