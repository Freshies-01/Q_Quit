import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const employeeRoutes: Routes = [
  {
    path: 'employee',
    component: EmployeeListComponent
  }
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmployeeListComponent]
})
export class EmployeeModule { }
