import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeFieldComponent } from "./employee-field/employee-field.component";
import { AngularMaterialModule } from "app/shared/angular-material.module";

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [EmployeeFieldComponent],
  exports: [EmployeeFieldComponent]
})
export class ControlValueAccessorsModule {}
