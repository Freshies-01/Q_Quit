import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlternativeMainComponent } from "app/Q_Q/alternative-main/alternative-main.component";

import { RecordsRouting } from "app/Q_Q/records/records.module";
import { reportsRoutes } from "app/Q_Q/reports/reports.module";
import { dashboardRoutes } from "app/Q_Q/dashboard/dashboard.module";
import { LoginPageComponent } from "app/Q_Q/login-page/login-page.component";
import { UserRouteAccessService } from "app/core/auth/user-route-access-service";

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "Q_Q",
    component: AlternativeMainComponent,

    data: {
      authorities: ["ROLE_HR", "ROLE_USER", "ROLE_ADMIN", "ROLE_FR"],
      pageTitle: "Change Page"
    },
    canActivate: [UserRouteAccessService],
    children: [...RecordsRouting, ...reportsRoutes, ...dashboardRoutes]
  },
  {
    path: "Q_Q/record/separationApplication",
    component: AlternativeMainComponent,

    data: {
      authorities: ["ROLE_HR", "ROLE_USER"],
      pageTitle: "Separation Applications"
    },
    canActivate: [UserRouteAccessService],
    children: [...RecordsRouting, ...reportsRoutes, ...dashboardRoutes]
  },
  {
    path: "Q_Q/record/employee",
    component: AlternativeMainComponent,

    data: {
      authorities: ["ROLE_ADMIN"],
      pageTitle: "Employees"
    },
    canActivate: [UserRouteAccessService],
    children: [...RecordsRouting, ...reportsRoutes, ...dashboardRoutes]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QQRoutingModule {}
