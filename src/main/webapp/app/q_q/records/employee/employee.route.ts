import {
  Routes,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";

import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeChangeComponent } from "./employee-change/employee-change.component";
import { UserService, User } from "app/core";

@Injectable({ providedIn: "root" })
export class UserRecordResolver implements Resolve<any> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["employeeId"] ? route.params["employeeId"] : null;
    if (id) {
      return this.service.find(id);
    } else {
      return new User();
    }
  }
}

export const employeeRoutes: Routes = [
  {
    path: "employee",
    children: [
      {
        path: ":employeeId",
        component: EmployeeChangeComponent,
        resolve: {
          user: UserRecordResolver
        }
      },
      {
        path: "",
        component: EmployeeListComponent
      }
    ]
  }
];
