import { Routes } from '@angular/router';
import { SeparationApplicationListComponent } from './separation-application-list.component';

export const separationApplicationRoute: Routes = [
    {
        path: 'separationApplication',
        component: SeparationApplicationListComponent
    },
    {
        path: '',
        redirectTo: 'separationApplication',
        pathMatch: 'full'
    }
];