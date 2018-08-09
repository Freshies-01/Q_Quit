import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FunctionReps } from 'app/shared/model/function-reps.model';
import { FunctionRepsService } from './function-reps.service';
import { FunctionRepsComponent } from './function-reps.component';
import { FunctionRepsDetailComponent } from './function-reps-detail.component';
import { FunctionRepsUpdateComponent } from './function-reps-update.component';
import { FunctionRepsDeletePopupComponent } from './function-reps-delete-dialog.component';
import { IFunctionReps } from 'app/shared/model/function-reps.model';

@Injectable({ providedIn: 'root' })
export class FunctionRepsResolve implements Resolve<IFunctionReps> {
    constructor(private service: FunctionRepsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((functionReps: HttpResponse<FunctionReps>) => functionReps.body));
        }
        return of(new FunctionReps());
    }
}

export const functionRepsRoute: Routes = [
    {
        path: 'function-reps',
        component: FunctionRepsComponent,
        data: {
            authorities: [],
            pageTitle: 'FunctionReps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'function-reps/:id/view',
        component: FunctionRepsDetailComponent,
        resolve: {
            functionReps: FunctionRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_HR'],
            pageTitle: 'FunctionReps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'function-reps/new',
        component: FunctionRepsUpdateComponent,
        resolve: {
            functionReps: FunctionRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'FunctionReps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'function-reps/:id/edit',
        component: FunctionRepsUpdateComponent,
        resolve: {
            functionReps: FunctionRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'FunctionReps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const functionRepsPopupRoute: Routes = [
    {
        path: 'function-reps/:id/delete',
        component: FunctionRepsDeletePopupComponent,
        resolve: {
            functionReps: FunctionRepsResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'FunctionReps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
