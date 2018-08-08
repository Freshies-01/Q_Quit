import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISeparationApplication } from 'app/shared/model/separation-application.model';
import { SeparationApplicationService } from './separation-application.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';
import { IHrReps } from 'app/shared/model/hr-reps.model';
import { HrRepsService } from 'app/entities/hr-reps';
import { IFunctionReps } from 'app/shared/model/function-reps.model';
import { FunctionRepsService } from 'app/entities/function-reps';

@Component({
    selector: 'jhi-separation-application-update',
    templateUrl: './separation-application-update.component.html'
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

    constructor(
        private jhiAlertService: JhiAlertService,
        private separationApplicationService: SeparationApplicationService,
        private employeeService: EmployeeService,
        private hrRepsService: HrRepsService,
        private functionRepsService: FunctionRepsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ separationApplication }) => {
            this.separationApplication = separationApplication;
        });
        this.employeeService.query({ filter: 'separationapplication-is-null' }).subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                if (!this.separationApplication.employee || !this.separationApplication.employee.id) {
                    this.employees = res.body;
                } else {
                    this.employeeService.find(this.separationApplication.employee.id).subscribe(
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
        this.isSaving = true;
        if (this.separationApplication.id !== undefined) {
            this.subscribeToSaveResponse(this.separationApplicationService.update(this.separationApplication));
        } else {
            this.subscribeToSaveResponse(this.separationApplicationService.create(this.separationApplication));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISeparationApplication>>) {
        result.subscribe(
            (res: HttpResponse<ISeparationApplication>) => this.onSaveSuccess(),
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
