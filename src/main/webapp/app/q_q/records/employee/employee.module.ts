import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EmployeeListComponent } from "app/Q_Q/records/employee/employee-list/employee-list.component";
import { EmployeeChangeComponent } from "./employee-change/employee-change.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [EmployeeListComponent, EmployeeChangeComponent]
})
export class MyEmployeeModule {}
