import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { SeparationApplicationModule } from './separation-application/separation-application.module';

import { separationApplicationRoute } from './separation-application/separation-application.route';

export const RecordsRouting: Routes = [
  {
    path: '',
    children: [
      ...separationApplicationRoute
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SeparationApplicationModule
  ],
  declarations: []
})
export class RecordsModule { }
