import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { QQuitSharedModule } from "app/shared";
import {
  FunctionRepsComponent,
  FunctionRepsDetailComponent,
  FunctionRepsUpdateComponent,
  FunctionRepsDeletePopupComponent,
  FunctionRepsDeleteDialogComponent,
  functionRepsRoute,
  functionRepsPopupRoute
} from "app/entities/function-reps";

const ENTITY_STATES = [...functionRepsRoute, ...functionRepsPopupRoute];

@NgModule({
  imports: [QQuitSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FunctionRepsComponent,
    FunctionRepsDetailComponent,
    FunctionRepsUpdateComponent,
    FunctionRepsDeleteDialogComponent,
    FunctionRepsDeletePopupComponent
  ],
  entryComponents: [
    FunctionRepsComponent,
    FunctionRepsUpdateComponent,
    FunctionRepsDeleteDialogComponent,
    FunctionRepsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitFunctionRepsModule {}
