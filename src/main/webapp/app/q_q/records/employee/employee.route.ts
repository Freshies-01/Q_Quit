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
