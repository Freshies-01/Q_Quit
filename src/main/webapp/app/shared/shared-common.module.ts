import { NgModule } from "@angular/core";

import {
  QQuitSharedLibsModule,
  JhiAlertComponent,
  JhiAlertErrorComponent
} from "app/shared";

@NgModule({
  imports: [QQuitSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [QQuitSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class QQuitSharedCommonModule {}
