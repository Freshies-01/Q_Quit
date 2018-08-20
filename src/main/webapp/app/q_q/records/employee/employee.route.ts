import { Routes } from "@angular/router";

import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeChangeComponent } from "./employee-change/employee-change.component";

export const employeeRoutes: Routes = [
  {
    path: "employee",
    children: [
      {
        path: ":employeeId",
        component: EmployeeChangeComponent
      },
      {
        path: "",
        component: EmployeeListComponent
      }
    ]
  }
];
