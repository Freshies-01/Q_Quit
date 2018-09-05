import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";
import { SeparationApplicationListComponent } from "./separation-application-list.component";
import { SeparationApplicationFormComponent } from "./forms/separation-application-form.component";
import {
  ActionListComponent,
  ActionEditPopupComponent
} from "./action-list/action-list.component";

import { AngularMaterialModule } from "app/shared/angular-material.module";
import { QQuitSharedModule } from "app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    QQuitSharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    SeparationApplicationListComponent,
    SeparationApplicationFormComponent,
    ActionListComponent,
    ActionEditPopupComponent
  ]
})
export class SeparationApplicationModule {}
