import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";
import { SeparationApplicationListComponent } from "app/Q_Q/records/separation-application/separation-application-list.component";

export const separationApplicationRoute: Routes = [
  {
    path: "separationApplication",
    component: SeparationApplicationListComponent
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [SeparationApplicationListComponent]
})
export class SeparationApplicationModule {}
