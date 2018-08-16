import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlternativeMainComponent } from "./alternative-main/alternative-main.component";

import { errorRoute } from "app/layouts";

import { RecordsRouting } from "./records/records.module";
import { reportsRoutes } from "./reports/reports.module";
import { dashboardRoutes } from "./dashboard/dashboard.module";
import { LoginPageComponent } from "./login-page/login-page.component";

const alternativeMainRoutes = [...errorRoute];

const routes: Routes = [
  {
    path: "Q_Q",
    component: AlternativeMainComponent,
    children: [
      ...alternativeMainRoutes,
      ...RecordsRouting,
      ...reportsRoutes,
      ...dashboardRoutes,
      {
        path: "login",
        component: LoginPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QQRoutingModule {}
