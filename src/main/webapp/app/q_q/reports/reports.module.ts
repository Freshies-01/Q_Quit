import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes } from "@angular/router";
import { ReportListComponent } from "app/Q_Q/reports/report-list/report-list.component";

export const reportsRoutes: Routes = [
  {
    path: "report",
    component: ReportListComponent
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [ReportListComponent]
})
export class ReportsModule {}
