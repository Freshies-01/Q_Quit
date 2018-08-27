import { Component, OnInit, Inject, AfterContentInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { Employee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee/employee.service";

import { fromEvent, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";

export interface DialockPickEmployeeData {
  employee: Employee;
}

@Component({
  selector: "jhi-dialog-pick-employee",
  templateUrl: "./dialog-pick-employee.component.html",
  styles: []
})
export class DialogPickEmployeeComponent implements OnInit, AfterContentInit {
  allEmployees: Employee[];
  filteredEmployees: Employee[];
  searchBox: HTMLInputElement;

  typeahead$;

  constructor(
    private dialogRef: MatDialogRef<DialogPickEmployeeComponent>,
    private employeeService: EmployeeService
  ) {}

  SearchInFirstAndLastName(searchTerm: string) {
    this.filteredEmployees = this.allEmployees.filter(item => {
      const firstAndLastName = `${item.user.firstName} ${item.user.lastName}`;
      const RegularExpression = new RegExp(searchTerm, "gmi");
      return firstAndLastName.match(RegularExpression);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.employeeService.query().subscribe(result => {
      this.allEmployees = result.body;
    });
  }
  ngAfterContentInit() {
    this.searchBox = document.getElementById("search-box") as HTMLInputElement;

    this.typeahead$ = fromEvent(this.searchBox, "input").pipe(
      map((event: KeyboardEvent) => (event.target as HTMLOutputElement).value),
      debounceTime(10),
      distinctUntilChanged()
    );

    this.typeahead$.subscribe(data => {
      console.log(data);
      this.SearchInFirstAndLastName(data);
    });
  }
}
