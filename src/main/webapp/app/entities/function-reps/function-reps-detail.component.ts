import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFunctionReps } from 'app/shared/model/function-reps.model';

@Component({
    selector: 'jhi-function-reps-detail',
    templateUrl: './function-reps-detail.component.html'
})
export class FunctionRepsDetailComponent implements OnInit {
    functionReps: IFunctionReps;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ functionReps }) => {
            this.functionReps = functionReps;
        });
    }

    previousState() {
        window.history.back();
    }
}
