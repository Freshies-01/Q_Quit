import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { SeparationApplicationModule, separationApplicationRoute } from './separation-application/separation-application.module';

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
