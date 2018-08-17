import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { QQuitSharedModule } from "app/shared";
import {
  SepartationApplicationLogComponent,
  SepartationApplicationLogDetailComponent,
  SepartationApplicationLogUpdateComponent,
  SepartationApplicationLogDeletePopupComponent,
  SepartationApplicationLogDeleteDialogComponent,
  separtationApplicationLogRoute,
  separtationApplicationLogPopupRoute
} from "./";

const ENTITY_STATES = [
  ...separtationApplicationLogRoute,
  ...separtationApplicationLogPopupRoute
];

@NgModule({
  imports: [QQuitSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SepartationApplicationLogComponent,
    SepartationApplicationLogDetailComponent,
    SepartationApplicationLogUpdateComponent,
    SepartationApplicationLogDeleteDialogComponent,
    SepartationApplicationLogDeletePopupComponent
  ],
  entryComponents: [
    SepartationApplicationLogComponent,
    SepartationApplicationLogUpdateComponent,
    SepartationApplicationLogDeleteDialogComponent,
    SepartationApplicationLogDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitSepartationApplicationLogModule {}
