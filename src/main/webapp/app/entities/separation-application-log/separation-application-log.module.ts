import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { QQuitSharedModule } from "app/shared";
import {
  SeparationApplicationLogComponent,
  SeparationApplicationLogDetailComponent,
  SeparationApplicationLogUpdateComponent,
  SeparationApplicationLogDeletePopupComponent,
  SeparationApplicationLogDeleteDialogComponent,
  separationApplicationLogRoute,
  separationApplicationLogPopupRoute
} from "app/entities/separation-application-log";

const ENTITY_STATES = [
  ...separationApplicationLogRoute,
  ...separationApplicationLogPopupRoute
];

@NgModule({
  imports: [QQuitSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SeparationApplicationLogComponent,
    SeparationApplicationLogDetailComponent,
    SeparationApplicationLogUpdateComponent,
    SeparationApplicationLogDeleteDialogComponent,
    SeparationApplicationLogDeletePopupComponent
  ],
  entryComponents: [
    SeparationApplicationLogComponent,
    SeparationApplicationLogUpdateComponent,
    SeparationApplicationLogDeleteDialogComponent,
    SeparationApplicationLogDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitSeparationApplicationLogModule {}
