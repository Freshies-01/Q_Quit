import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HrReps } from 'app/shared/model/hr-reps.model';
import { HrRepsService } from './hr-reps.service';
import { HrRepsComponent } from './hr-reps.component';
import { HrRepsDetailComponent } from './hr-reps-detail.component';
import { HrRepsUpdateComponent } from './hr-reps-update.component';
import { HrRepsDeletePopupComponent } from './hr-reps-delete-dialog.component';
import { IHrReps } from 'app/shared/model/hr-reps.model';

@Injectable({ providedIn: 'root' })
export class HrRepsResolve implements Resolve<IHrReps> {
    constructor(private service: HrRepsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((hrReps: HttpResponse<HrReps>) => hrReps.body));
        }
        return of(new HrReps());
    }
}

export const hrRepsRoute: Routes = [
    {
        path: 'hr-reps',
        component: HrRepsComponent,
        data: {
            authorities: [],
            pageTitle: 'HrReps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hr-reps/:id/view',
        component: HrRepsDetailComponent,
        resolve: {
            hrReps: HrRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'HrReps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hr-reps/new',
        component: HrRepsUpdateComponent,
        resolve: {
            hrReps: HrRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'HrReps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hr-reps/:id/edit',
        component: HrRepsUpdateComponent,
        resolve: {
            hrReps: HrRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'HrReps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hrRepsPopupRoute: Routes = [
    {
        path: 'hr-reps/:id/delete',
        component: HrRepsDeletePopupComponent,
        resolve: {
            hrReps: HrRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'HrReps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
