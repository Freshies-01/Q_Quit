import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
