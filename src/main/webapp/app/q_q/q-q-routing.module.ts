import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavTopComponent } from './nav-top/nav-top.component';
import { NavSideComponent } from './nav-side/nav-side.component';
import { AlternativeMainComponent } from './alternative-main/alternative-main.component';
import { separationApplicationRoute } from './separation-application/separation-application.route';

import { errorRoute } from 'app/layouts';

const alternativeMainRoutes = [...errorRoute];

const routes: Routes = [{
  path: 'Q_Q',
  component: AlternativeMainComponent,
  children: [
    ...alternativeMainRoutes,
    ...separationApplicationRoute
  ]
},];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QQRoutingModule { }
