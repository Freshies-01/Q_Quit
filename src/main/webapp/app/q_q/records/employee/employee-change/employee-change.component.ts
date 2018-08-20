import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { User } from "app/core";

@Component({
  selector: "jhi-employee-change",
  templateUrl: "./employee-change.component.html",
  styles: []
})
export class EmployeeChangeComponent implements OnInit {
  user: User;
  constructor(private activetedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activetedRoute.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }
}
