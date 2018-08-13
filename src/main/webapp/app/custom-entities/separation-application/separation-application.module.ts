import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { separationApplicationRoute } from './separation-application.route';
import { SeparationApplicationListComponent } from './separation-application-list.component';

const entityStates: Routes = [separationApplicationRoute];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(entityStates)
  ],
  declarations: [SeparationApplicationListComponent]
})
export class SeparationApplicationModule { }
