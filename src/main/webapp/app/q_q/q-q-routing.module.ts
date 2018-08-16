import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlternativeMainComponent } from "app/Q_Q/alternative-main/alternative-main.component";

import { errorRoute } from "app/layouts";

import { RecordsRouting } from "app/Q_Q/records/records.module";
import { reportsRoutes } from "app/Q_Q/reports/reports.module";
import { dashboardRoutes } from "app/Q_Q/dashboard/dashboard.module";

const alternativeMainRoutes = [...errorRoute];

const routes: Routes = [
  {
    path: "Q_Q",
    component: AlternativeMainComponent,
    children: [
      ...alternativeMainRoutes,
      ...RecordsRouting,
      ...reportsRoutes,
      ...dashboardRoutes
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QQRoutingModule {}
