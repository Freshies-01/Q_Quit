import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SeparationApplicationListComponent } from "./separation-application-list.component";
import { SeparationApplicationFormComponent } from "./forms/separation-application-form.component";
import { AngularMaterialModule } from "app/shared/angular-material.module";
import { SeparationApplicationResolve } from "app/entities/separation-application/separation-application.route";

export const separationApplicationRoute: Routes = [
  {
    path: "separationApplication",
    component: SeparationApplicationListComponent
  },
  {
    path: "separationApplicationForm",
    component: SeparationApplicationFormComponent
  },
  {
    path: "separationApplicationForm/:id/view",
    component: SeparationApplicationFormComponent,
    resolve: {
      separationApplication: SeparationApplicationResolve
    }
  }
];

@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  declarations: [
    SeparationApplicationListComponent,
    SeparationApplicationFormComponent
  ]
})
export class SeparationApplicationModule {}
