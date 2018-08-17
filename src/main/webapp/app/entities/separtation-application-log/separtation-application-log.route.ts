import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes
} from "@angular/router";
import { JhiPaginationUtil, JhiResolvePagingParams } from "ng-jhipster";
import { UserRouteAccessService } from "app/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { SepartationApplicationLog } from "app/shared/model/separtation-application-log.model";
import { SepartationApplicationLogService } from "./separtation-application-log.service";
import { SepartationApplicationLogComponent } from "./separtation-application-log.component";
import { SepartationApplicationLogDetailComponent } from "./separtation-application-log-detail.component";
import { SepartationApplicationLogUpdateComponent } from "./separtation-application-log-update.component";
import { SepartationApplicationLogDeletePopupComponent } from "./separtation-application-log-delete-dialog.component";
import { ISepartationApplicationLog } from "app/shared/model/separtation-application-log.model";

@Injectable({ providedIn: "root" })
export class SepartationApplicationLogResolve
  implements Resolve<ISepartationApplicationLog> {
  constructor(private service: SepartationApplicationLogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service
        .find(id)
        .pipe(
          map(
            (
              separtationApplicationLog: HttpResponse<SepartationApplicationLog>
            ) => separtationApplicationLog.body
          )
        );
    }
    return of(new SepartationApplicationLog());
  }
}

export const separtationApplicationLogRoute: Routes = [
  {
    path: "separtation-application-log",
    component: SepartationApplicationLogComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ["ROLE_USER"],
      defaultSort: "id,asc",
      pageTitle: "SepartationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "separtation-application-log/:id/view",
    component: SepartationApplicationLogDetailComponent,
    resolve: {
      separtationApplicationLog: SepartationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SepartationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "separtation-application-log/new",
    component: SepartationApplicationLogUpdateComponent,
    resolve: {
      separtationApplicationLog: SepartationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SepartationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "separtation-application-log/:id/edit",
    component: SepartationApplicationLogUpdateComponent,
    resolve: {
      separtationApplicationLog: SepartationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SepartationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  }
];

export const separtationApplicationLogPopupRoute: Routes = [
  {
    path: "separtation-application-log/:id/delete",
    component: SepartationApplicationLogDeletePopupComponent,
    resolve: {
      separtationApplicationLog: SepartationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SepartationApplicationLogs"
    },
    canActivate: [UserRouteAccessService],
    outlet: "popup"
  }
];
