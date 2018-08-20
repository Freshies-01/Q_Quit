import { Component, OnInit } from "@angular/core";

import { EmployeeService } from "app/entities/employee";

@Component({
  selector: "jhi-employee-change",
  templateUrl: "./employee-change.component.html",
  styles: []
})
export class EmployeeChangeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {}
}
