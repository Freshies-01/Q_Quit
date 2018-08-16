import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { QQRoutingModule } from "app/Q_Q/q-q-routing.module";

import { NavTopComponent } from "app/Q_Q/nav-top/nav-top.component";
import { NavSideComponent } from "app/Q_Q/nav-side/nav-side.component";
import { AlternativeMainComponent } from "app/Q_Q/alternative-main/alternative-main.component";
import { RecordsModule } from "app/Q_Q/records/records.module";
import { ReportsModule } from "app/Q_Q/reports/reports.module";
import { DashboardModule } from "app/Q_Q/dashboard/dashboard.module";

@NgModule({
  imports: [
    CommonModule,
    RecordsModule,
    QQRoutingModule,
    ReportsModule,
    DashboardModule
  ],
  declarations: [NavTopComponent, NavSideComponent, AlternativeMainComponent]
})
export class QQModule {}
