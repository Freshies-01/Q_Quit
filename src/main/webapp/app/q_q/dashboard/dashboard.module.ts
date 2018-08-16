import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule
} from "@angular/material";

export const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
