import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { SeparationApplicationModule, separationApplicationRoute } from './separation-application/separation-application.module';
import { EmployeeModule, employeeRoutes } from './employee/employee.module';

export const RecordsRouting: Routes = [
  {
    path: '',
    children: [
      ...separationApplicationRoute,
      ...employeeRoutes,
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SeparationApplicationModule,
    EmployeeModule
  ],
  declarations: []
})
export class RecordsModule { }
