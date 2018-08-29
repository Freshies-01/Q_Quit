import {
  Routes,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { ActionListComponent } from "./action-list.component";
import {
  ActionDeleteDialogComponent,
  ActionDeletePopupComponent
} from "../../../../entities/action/action-delete-dialog.component";
import { IAction, Action } from "app/shared/model/action.model";
import { ActionService } from "app/entities/action";
import { HttpResponse } from "@angular/common/http";
import { UserRouteAccessService } from "app/core";
import { map } from "../../../../../../../../node_modules/rxjs/operators";
import { of } from "../../../../../../../../node_modules/rxjs";

@Injectable({ providedIn: "root" })
export class ActionResolve implements Resolve<IAction> {
  constructor(private service: ActionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service
        .find(id)
        .pipe(map((action: HttpResponse<Action>) => action.body));
    }
    return of(new Action());
  }
}

export const actionPopupRoute: Routes = [
  {
    path: "action/:id/delete",
    component: ActionDeletePopupComponent,
    resolve: {
      action: ActionResolve
    },
    data: {
      authorities: [],
      pageTitle: "Actions"
    },
    canActivate: [UserRouteAccessService],
    outlet: "popup"
  }
];
