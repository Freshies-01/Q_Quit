import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QQuitSharedModule } from 'app/shared';
import {
    HrRepsComponent,
    HrRepsDetailComponent,
    HrRepsUpdateComponent,
    HrRepsDeletePopupComponent,
    HrRepsDeleteDialogComponent,
    hrRepsRoute,
    hrRepsPopupRoute
} from './';

const ENTITY_STATES = [...hrRepsRoute, ...hrRepsPopupRoute];

@NgModule({
    imports: [QQuitSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HrRepsComponent, HrRepsDetailComponent, HrRepsUpdateComponent, HrRepsDeleteDialogComponent, HrRepsDeletePopupComponent],
    entryComponents: [HrRepsComponent, HrRepsUpdateComponent, HrRepsDeleteDialogComponent, HrRepsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitHrRepsModule {}
