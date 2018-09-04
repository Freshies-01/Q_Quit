import "./vendor.ts";

import { NgModule, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  Ng2Webstorage,
  LocalStorageService,
  SessionStorageService
} from "ngx-webstorage";
import { JhiEventManager } from "ng-jhipster";

import { AuthInterceptor } from "app/blocks/interceptor/auth.interceptor";
import { AuthExpiredInterceptor } from "app/blocks/interceptor/auth-expired.interceptor";
import { ErrorHandlerInterceptor } from "app/blocks/interceptor/errorhandler.interceptor";
import { NotificationInterceptor } from "app/blocks/interceptor/notification.interceptor";
import { QQuitSharedModule } from "app/shared";
import { QQuitCoreModule } from "app/core";
import { QQuitAppRoutingModule } from "app/app-routing.module";
import { QQuitHomeModule } from "app/home/home.module";
import { QQuitAccountModule } from "app/account/account.module";
import { QQuitEntityModule } from "app/entities/entity.module";
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
  JhiMainComponent,
  NavbarComponent,
  FooterComponent,
  PageRibbonComponent,
  ErrorComponent
} from "app/layouts";
import { QQModule } from "app/Q_Q/q-q.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "app/shared/angular-material.module";

@NgModule({
  imports: [
    BrowserModule,
    QQuitAppRoutingModule,
    Ng2Webstorage.forRoot({ prefix: "jhi", separator: "-" }),
    QQuitSharedModule,
    QQuitCoreModule,
    QQuitHomeModule,
    QQuitAccountModule,
    QQuitEntityModule,
    QQModule,
    BrowserAnimationsModule,
    AngularMaterialModule
    // jhipster-needle-angular-add-module JHipster will add new module here
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService, SessionStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
      deps: [JhiEventManager]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
      deps: [Injector]
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class QQuitAppModule {}
