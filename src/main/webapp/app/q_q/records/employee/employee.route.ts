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
import { EmployeeRegisterComponent } from "./employee-register/employee-register.component";

@Injectable({ providedIn: "root" })
export class UserRecordResolver implements Resolve<any> {
  constructor(private service: UserService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["username"] ? route.params["username"] : null;
    if (id) {
      const user = await this.service.find(id).toPromise();
      return user.body;
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
        path: "edit/:username",
        component: EmployeeChangeComponent,
        resolve: {
          user: UserRecordResolver
        }
      },
      {
        path: "edit",
        component: EmployeeChangeComponent,
        resolve: {
          user: UserRecordResolver
        }
      },
      {
        path: "create",
        component: EmployeeRegisterComponent
      },
      {
        path: "",
        component: EmployeeListComponent
      }
    ]
  }
];
