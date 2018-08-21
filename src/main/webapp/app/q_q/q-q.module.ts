import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { QQRoutingModule } from "app/Q_Q/q-q-routing.module";

import { NavTopComponent } from "app/Q_Q/nav-top/nav-top.component";
import { NavSideComponent } from "app/Q_Q/nav-side/nav-side.component";
import { AlternativeMainComponent } from "app/Q_Q/alternative-main/alternative-main.component";
import { RecordsModule } from "app/Q_Q/records/records.module";
import { ReportsModule } from "app/Q_Q/reports/reports.module";
import { DashboardModule } from "app/Q_Q/dashboard/dashboard.module";
import { LoginPageComponent } from "app/Q_Q/login-page/login-page.component";

@NgModule({
  imports: [
    CommonModule,
    RecordsModule,
    QQRoutingModule,
    ReportsModule,
    DashboardModule,
    FormsModule
  ],
  declarations: [
    NavTopComponent,
    NavSideComponent,
    AlternativeMainComponent,
    LoginPageComponent
  ]
})
export class QQModule {}
