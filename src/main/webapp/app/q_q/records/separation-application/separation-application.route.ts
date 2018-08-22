import { SeparationApplicationListComponent } from "./separation-application-list.component";
import { SeparationApplicationFormComponent } from "./forms/separation-application-form.component";
import { SeparationApplicationResolve } from "app/entities/separation-application/separation-application.route";

import { Routes } from "@angular/router";

export const separationApplicationRoute: Routes = [
  {
    path: "separationApplication",
    component: SeparationApplicationListComponent
  },
  {
    path: "separationApplication/:id/view",
    component: SeparationApplicationFormComponent,
    resolve: {
      separationApplication: SeparationApplicationResolve
    }
  },
  {
    path: "separationApplication/new",
    component: SeparationApplicationFormComponent,
    data: {
      pageTitle: "New Separation Application"
    },
    resolve: {
      separationApplication: SeparationApplicationResolve
    }
  }
];
