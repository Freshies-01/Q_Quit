import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgbDateAdapter } from "@ng-bootstrap/ng-bootstrap";

import { NgbDateMomentAdapter } from "app/shared/util/datepicker-adapter";
import {
  QQuitSharedLibsModule,
  QQuitSharedCommonModule,
  JhiLoginModalComponent,
  HasAnyAuthorityDirective
} from "app/shared";
import { KeysPipe } from "./util/EnumKeyPipe/enum-key.pipe";

@NgModule({
  imports: [QQuitSharedLibsModule, QQuitSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, KeysPipe],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    QQuitSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    KeysPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QQuitSharedModule {}
