import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QQRoutingModule } from './q-q-routing.module';

import { NavTopComponent } from './nav-top/nav-top.component';
import { NavSideComponent } from './nav-side/nav-side.component';
import { AlternativeMainComponent } from './alternative-main/alternative-main.component';
import { RecordsModule } from './records/records.module';
import { EmployeeModule } from './records/employee/employee.module';

@NgModule({
  imports: [
    CommonModule,
    RecordsModule,
    QQRoutingModule,
    EmployeeModule
  ],
  declarations: [NavTopComponent, NavSideComponent, AlternativeMainComponent]
})
export class QQModule { }
