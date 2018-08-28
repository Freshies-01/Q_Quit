import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  HostBinding,
  Optional,
  Self,
  Input
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatFormFieldControl
} from "@angular/material";

import { Subject } from "rxjs";

import { DialogPickEmployeeComponent } from "app/q_q/records/employee/dialog-pick-employee/dialog-pick-employee.component";
import { Employee } from "app/shared/model/employee.model";

@Component({
  selector: "jhi-employee-field",
  template: `
  <ng-container [ngSwitch]="!!employee">
    <ng-container *ngSwitchCase="true">
      <span #location>{{employee.user?.firstName}} {{employee.user?.firstName}}</span>
    </ng-container>
    <ng-container *ngSwitchCase="false">
    </ng-container>
    <button matSuffix type="button" (click)="openEmployeeSelectorDialog()">edit</button>
  </ng-container>
  `,
  styles: [
    ":host-context mat-form-field-type-employee-field-component {width: 100%}"
  ],
  providers: [
    /*
    We are injecting the value of accessor in the constructor
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EmployeeFieldComponent,
      multi: true
    },*/
    { provide: MatFormFieldControl, useExisting: EmployeeFieldComponent }
  ]
})
export class EmployeeFieldComponent
  implements
    OnInit,
    ControlValueAccessor,
    MatFormFieldControl<Employee>,
    OnDestroy {
  @ViewChild("location") location: ElementRef;
  dialogReference: MatDialogRef<DialogPickEmployeeComponent>;
  employee: Employee = new Employee();
  private onChange;
  stateChanges = new Subject<void>();
  static nextId = 0;
  readonly placeholder: string;
  @HostBinding() id = `my-tel-input-${EmployeeFieldComponent.nextId++}`;
  focused = false;
  get empty(): boolean {
    return !!this.employee;
  }
  get value(): Employee | null {
    return this.employee;
  }
  readonly shouldLabelFloat = true;
  readonly required = false;
  private _disabled = false;
  readonly errorState = false;
  readonly controlType = "employee-field-component";
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = !!dis;
    this.stateChanges.next();
  }
  set value(value: Employee | null) {
    this.employee = value;
    this.stateChanges.next();
  }
  @HostBinding("attr.aria-describedby") describedBy = "";
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(" ");
  }
  onContainerClick(event: MouseEvent) {
    // // FOLLOWING IS A GOOD IMPLEMENTATION FOR MAKING SURE THAT THE CORRECT THING IN CUSTOM ELEMENT GETS FOCUSED WHEN CLICKED
    // if ((event.target as Element).tagName.toLowerCase() !== "input") {
    //   this.elRef.nativeElement.querySelector("input").focus();
    // }
  }

  constructor(
    private renderer: Renderer2,
    private dialog: MatDialog,
    @Optional()
    @Self()
    public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  writeValue(obj: any): void {
    console.log(obj);
    this.employee = obj;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void;

  openEmployeeSelectorDialog() {
    this.dialogReference = this.dialog.open(DialogPickEmployeeComponent);
    this.dialogReference.beforeClose().subscribe(pickedEmployee => {
      if (pickedEmployee) {
        this.employee = pickedEmployee;
        this.onChange(this.employee);
      }
    });
  }
}
