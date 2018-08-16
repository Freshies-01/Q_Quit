import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";

import {
  SeparationApplicationModule,
  separationApplicationRoute
} from "app/Q_Q/records/separation-application/separation-application.module";
import {
  EmployeeModule,
  employeeRoutes
} from "app/Q_Q/records/employee/employee.module";

export const RecordsRouting: Routes = [
  {
    path: "record",
    children: [...separationApplicationRoute, ...employeeRoutes]
  }
];

@NgModule({
  imports: [CommonModule, SeparationApplicationModule, EmployeeModule],
  declarations: []
})
export class RecordsModule {}
