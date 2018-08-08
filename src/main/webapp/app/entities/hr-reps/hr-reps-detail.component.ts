import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHrReps } from 'app/shared/model/hr-reps.model';

@Component({
    selector: 'jhi-hr-reps-detail',
    templateUrl: './hr-reps-detail.component.html'
})
export class HrRepsDetailComponent implements OnInit {
    hrReps: IHrReps;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hrReps }) => {
            this.hrReps = hrReps;
        });
    }

    previousState() {
        window.history.back();
    }
}
