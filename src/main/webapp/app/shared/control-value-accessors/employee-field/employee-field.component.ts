import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "jhi-employee-field",
  template: `
  <div>Employee Select Field</div>
  <div #location></div>
  `,
  styles: [`'div {width: 100px}'`]
})
export class EmployeeFieldComponent implements OnInit {
  @ViewChild("location") location;
  widget;
  constructor() {}

  ngOnInit() {
    console.log(location);
  }
}
