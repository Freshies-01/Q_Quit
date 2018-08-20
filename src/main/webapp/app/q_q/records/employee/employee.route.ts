import { Injectable, Component } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
  CanActivate
} from "@angular/router";

import { Principal, User, UserService } from "app/core";
import { EmployeeContainerComponent } from "./employee-container.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeRecordChangeComponent } from "./employee-change/employee-change.component";

export const employeeRoutes: Routes = [
  {
    path: "employee",
    component: EmployeeContainerComponent,
    children: [
      {
        path: "list",
        component: EmployeeListComponent
      },
      {
        path: ":employeeId",
        component: EmployeeRecordChangeComponent
      }
    ]
  }
  // {
  //   path: "user-management",
  //   component: UserMgmtComponent,
  //   resolve: {
  //     pagingParams: JhiResolvePagingParams
  //   },
  //   data: {
  //     pageTitle: "Users",
  //     defaultSort: "id,asc"
  //   }
  // },
  // {
  //   path: "user-management/:login/view",
  //   component: UserMgmtDetailComponent,
  //   resolve: {
  //     user: UserMgmtResolve
  //   },
  //   data: {
  //     pageTitle: "Users"
  //   }
  // },
  // {
  //   path: "user-management/new",
  //   component: UserMgmtUpdateComponent,
  //   resolve: {
  //     user: UserMgmtResolve
  //   }
  // },
  // {
  //   path: "user-management/:login/edit",
  //   component: UserMgmtUpdateComponent,
  //   resolve: {
  //     user: UserMgmtResolve
  //   }
  // }
];
