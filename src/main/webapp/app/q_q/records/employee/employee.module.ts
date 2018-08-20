import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EmployeeListComponent } from "app/Q_Q/records/employee/employee-list/employee-list.component";
import { EmployeeChangeComponent } from "./employee-change/employee-change.component";
import { AngularMaterialModule } from "app/shared/angular-material.module";

@NgModule({
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  declarations: [EmployeeListComponent, EmployeeChangeComponent]
})
export class MyEmployeeModule {}
