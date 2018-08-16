import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { QQRoutingModule } from "./q-q-routing.module";

import { NavTopComponent } from "./nav-top/nav-top.component";
import { NavSideComponent } from "./nav-side/nav-side.component";
import { AlternativeMainComponent } from "./alternative-main/alternative-main.component";
import { RecordsModule } from "./records/records.module";
import { ReportsModule } from "./reports/reports.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LoginPageComponent } from "./login-page/login-page.component";

@NgModule({
  imports: [
    CommonModule,
    RecordsModule,
    QQRoutingModule,
    ReportsModule,
    DashboardModule
  ],
  declarations: [
    NavTopComponent,
    NavSideComponent,
    AlternativeMainComponent,
    LoginPageComponent
  ]
})
export class QQModule {}
