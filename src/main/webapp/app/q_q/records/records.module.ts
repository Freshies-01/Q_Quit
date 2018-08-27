import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";

import {
  SeparationApplicationModule,
  separationApplicationRoute
} from "app/Q_Q/records/separation-application/separation-application.module";
import { MyEmployeeModule } from "app/Q_Q/records/employee/employee.module";

import { employeeRoutes } from "./employee/employee.route";

export const RecordsRouting: Routes = [
  {
    path: "record",
    children: [...separationApplicationRoute, ...employeeRoutes]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SeparationApplicationModule,
    MyEmployeeModule,
    RouterModule
  ],
  declarations: []
})
export class RecordsModule {}
