import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlternativeMainComponent } from "./alternative-main/alternative-main.component";

import { RecordsRouting } from "./records/records.module";
import { reportsRoutes } from "./reports/reports.module";
import { dashboardRoutes } from "./dashboard/dashboard.module";
import { LoginPageComponent } from "./login-page/login-page.component";
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
      authorities: ["ROLE_ADMIN"],

      pageTitle: "Separation Applications"
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
