import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { QQuitSharedModule } from "app/shared";
import {
  ActionComponent,
  ActionDetailComponent,
  ActionUpdateComponent,
  ActionDeletePopupComponent,
  ActionDeleteDialogComponent,
  actionRoute,
  actionPopupRoute
} from "./";

const ENTITY_STATES = [...actionRoute, ...actionPopupRoute];

@NgModule({
  imports: [QQuitSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ActionComponent,
    ActionDetailComponent,
    ActionUpdateComponent,
    ActionDeleteDialogComponent,
    ActionDeletePopupComponent
  ],
  entryComponents: [
    ActionComponent,
    ActionUpdateComponent,
    ActionDeleteDialogComponent,
    ActionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitActionModule {}
