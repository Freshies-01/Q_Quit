import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";
import { SeparationApplicationListComponent } from "./separation-application-list.component";
import { SeparationApplicationFormComponent } from "./forms/separation-application-form.component";
import { AngularMaterialModule } from "app/shared/angular-material.module";

export const separationApplicationRoute: Routes = [
  {
    path: "separationApplication",
    component: SeparationApplicationListComponent
  },
  {
    path: "separationApplicationForm",
    component: SeparationApplicationFormComponent
  }
];

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [
    SeparationApplicationListComponent,
    SeparationApplicationFormComponent
  ]
})
export class SeparationApplicationModule {}
