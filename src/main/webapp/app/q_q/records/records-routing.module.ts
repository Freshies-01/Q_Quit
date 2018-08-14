import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { separationApplicationRoute } from './separation-application/separation-application.route';

export const RecordsRouting: Routes = [
  {
    path: '',
    children: [
      ...separationApplicationRoute
    ]
  }
];
