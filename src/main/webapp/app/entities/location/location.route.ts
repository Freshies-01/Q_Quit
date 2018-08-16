import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes
} from "@angular/router";
import { UserRouteAccessService } from "app/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { Location } from "app/shared/model/location.model";
import { LocationService } from "app/entities/location/location.service";
import { LocationComponent } from "app/entities/location/location.component";
import { LocationDetailComponent } from "app/entities/location/location-detail.component";
import { LocationUpdateComponent } from "app/entities/location/location-update.component";
import { LocationDeletePopupComponent } from "app/entities/location/location-delete-dialog.component";
import { ILocation } from "app/shared/model/location.model";

@Injectable({ providedIn: "root" })
export class LocationResolve implements Resolve<ILocation> {
  constructor(private service: LocationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service
        .find(id)
        .pipe(map((location: HttpResponse<Location>) => location.body));
    }
    return of(new Location());
  }
}

export const locationRoute: Routes = [
  {
    path: "location",
    component: LocationComponent,
    data: {
      authorities: [],
      pageTitle: "Locations"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "location/:id/view",
    component: LocationDetailComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ["ROLE_ADMIN"],
      pageTitle: "Locations"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "location/new",
    component: LocationUpdateComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ["ROLE_ADMIN"],
      pageTitle: "Locations"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "location/:id/edit",
    component: LocationUpdateComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ["ROLE_ADMIN"],
      pageTitle: "Locations"
    },
    canActivate: [UserRouteAccessService]
  }
];

export const locationPopupRoute: Routes = [
  {
    path: "location/:id/delete",
    component: LocationDeletePopupComponent,
    resolve: {
      location: LocationResolve
    },
    data: {
      authorities: ["ROLE_ADMIN"],
      pageTitle: "Locations"
    },
    canActivate: [UserRouteAccessService],
    outlet: "popup"
  }
];
