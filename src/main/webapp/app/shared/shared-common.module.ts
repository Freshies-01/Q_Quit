import { NgModule } from '@angular/core';

import { QQuitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [QQuitSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [QQuitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class QQuitSharedCommonModule {}
