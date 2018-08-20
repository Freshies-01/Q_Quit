import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";
import { EmployeeListComponent } from "app/Q_Q/records/employee/employee-list/employee-list.component";
import { EmployeeChangeComponent } from "app/q_q/records/employee/employee-change/employee-change.component";

export const employeeRoutes: Routes = [
  {
    path: "employee",
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [EmployeeListComponent, EmployeeChangeComponent]
})
export class EmployeeModule {}
