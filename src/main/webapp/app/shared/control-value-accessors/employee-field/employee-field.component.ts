import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { DialogPickEmployeeComponent } from "app/q_q/records/employee/dialog-pick-employee/dialog-pick-employee.component";
import { Employee } from "app/shared/model/employee.model";

@Component({
  selector: "jhi-employee-field",
  template: `
  <h1>{{employee}}</h1>
  <-- <h4>Employee: {{employee.id}}</h4>
  <h4 #location>{{employee.user?.firstName}} {{employee.user?.firstName}}</h4> -->
  <button type="button" (click)="openEmployeeSelectorDialog()">edit</button>
  `,
  styles: [
    `
    :host {
    display: block;
    border: 1px solid black;
    width: 100%;
  }`
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EmployeeFieldComponent,
      multi: true
    }
  ]
})
export class EmployeeFieldComponent implements OnInit, ControlValueAccessor {
  @ViewChild("location") location: ElementRef;
  dialogReference: MatDialogRef<DialogPickEmployeeComponent>;
  employee: Employee = new Employee();
  private onChange;
  constructor(private renderer: Renderer2, private dialog: MatDialog) {}

  ngOnInit() {}

  writeValue(obj: any): void {
    this.employee = obj;
  }

  registerOnChange(fn: (_: any) => void): void {
    console.log("change detection registered");
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void;

  openEmployeeSelectorDialog() {
    this.dialogReference = this.dialog.open(DialogPickEmployeeComponent);
    this.dialogReference.beforeClose().subscribe(pickedEmployee => {
      this.employee = pickedEmployee;
      this.onChange(this.employee);
      console.log("change happened");
    });
  }
}
