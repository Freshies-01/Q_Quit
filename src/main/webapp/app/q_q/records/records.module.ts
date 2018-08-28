import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { SeparationApplicationModule } from "app/Q_Q/records/separation-application/separation-application.module";
import { MyEmployeeModule } from "app/Q_Q/records/employee/employee.module";
import { separationApplicationRoute } from "./separation-application/separation-application.route";

import { employeeRoutes } from "./employee/employee.route";

export const RecordsRouting: Routes = [
  {
    path: "record",
    children: [...separationApplicationRoute, ...employeeRoutes]
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SeparationApplicationModule,
    MyEmployeeModule,
    RouterModule
  ],
  declarations: []
})
export class RecordsModule {}
