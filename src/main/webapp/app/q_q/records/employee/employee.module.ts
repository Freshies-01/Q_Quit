import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EmployeeListComponent } from "app/Q_Q/records/employee/employee-list/employee-list.component";
import { EmployeeRecordChangeComponent } from "app/q_q/records/employee/employee-change/employee-change.component";
import { EmployeeContainerComponent } from "./employee-container.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    EmployeeListComponent,
    EmployeeRecordChangeComponent,
    EmployeeContainerComponent
  ]
})
export class MyEmployeeModule {}
