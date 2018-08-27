import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeFieldComponent } from "./employee-field/employee-field.component";

@NgModule({
  imports: [CommonModule],
  declarations: [EmployeeFieldComponent],
  exports: [EmployeeFieldComponent]
})
export class ControlValueAccessorsModule {}
