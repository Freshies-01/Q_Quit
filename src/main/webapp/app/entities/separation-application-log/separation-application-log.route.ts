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
import { SeparationApplicationLog } from "app/shared/model/separation-application-log.model";
import { SeparationApplicationLogService } from "app/entities/separation-application-log/separation-application-log.service";
import { SeparationApplicationLogComponent } from "app/entities/separation-application-log/separation-application-log.component";
import { SeparationApplicationLogDetailComponent } from "app/entities/separation-application-log/separation-application-log-detail.component";
import { SeparationApplicationLogUpdateComponent } from "app/entities/separation-application-log/separation-application-log-update.component";
import { SeparationApplicationLogDeletePopupComponent } from "app/entities/separation-application-log/separation-application-log-delete-dialog.component";
import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";

@Injectable({ providedIn: "root" })
export class SeparationApplicationLogResolve
  implements Resolve<ISeparationApplicationLog> {
  constructor(private service: SeparationApplicationLogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service
        .find(id)
        .pipe(
          map(
            (
              separationApplicationLog: HttpResponse<SeparationApplicationLog>
            ) => separationApplicationLog.body
          )
        );
    }
    return of(new SeparationApplicationLog());
  }
}

export const separationApplicationLogRoute: Routes = [
  {
    path: "separation-application-log",
    component: SeparationApplicationLogComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ["ROLE_USER"],
      defaultSort: "id,asc",
      pageTitle: "SeparationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "separation-application-log/:id/view",
    component: SeparationApplicationLogDetailComponent,
    resolve: {
      separationApplicationLog: SeparationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SeparationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "separation-application-log/new",
    component: SeparationApplicationLogUpdateComponent,
    resolve: {
      separationApplicationLog: SeparationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SeparationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "separation-application-log/:id/edit",
    component: SeparationApplicationLogUpdateComponent,
    resolve: {
      separationApplicationLog: SeparationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SeparationApplicationLogs"
    },
    canActivate: [UserRouteAccessService]
  }
];

export const separationApplicationLogPopupRoute: Routes = [
  {
    path: "separation-application-log/:id/delete",
    component: SeparationApplicationLogDeletePopupComponent,
    resolve: {
      separationApplicationLog: SeparationApplicationLogResolve
    },
    data: {
      authorities: ["ROLE_USER"],
      pageTitle: "SeparationApplicationLogs"
    },
    canActivate: [UserRouteAccessService],
    outlet: "popup"
  }
];
