import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { separationApplicationRoute } from './separation-application.route';
import { SeparationApplicationListComponent } from './separation-application-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SeparationApplicationListComponent]
})
export class SeparationApplicationModule { }
