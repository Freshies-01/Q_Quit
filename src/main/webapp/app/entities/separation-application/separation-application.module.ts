import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { QQuitSharedModule } from "app/shared";
import {
  SeparationApplicationComponent,
  SeparationApplicationDetailComponent,
  SeparationApplicationUpdateComponent,
  SeparationApplicationDeletePopupComponent,
  SeparationApplicationDeleteDialogComponent,
  separationApplicationRoute,
  separationApplicationPopupRoute
} from "app/entities/separation-application";

const ENTITY_STATES = [
  ...separationApplicationRoute,
  ...separationApplicationPopupRoute
];

@NgModule({
  imports: [QQuitSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SeparationApplicationComponent,
    SeparationApplicationDetailComponent,
    SeparationApplicationUpdateComponent,
    SeparationApplicationDeleteDialogComponent,
    SeparationApplicationDeletePopupComponent
  ],
  entryComponents: [
    SeparationApplicationComponent,
    SeparationApplicationUpdateComponent,
    SeparationApplicationDeleteDialogComponent,
    SeparationApplicationDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitSeparationApplicationModule {}
