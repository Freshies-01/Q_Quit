import { Routes } from "@angular/router";

import {
  activateRoute,
  passwordRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute,
  registerRoute,
  settingsRoute
} from "app/account";

const ACCOUNT_ROUTES = [
  activateRoute,
  passwordRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute,
  registerRoute,
  settingsRoute
];

export const accountState: Routes = [
  {
    path: "",
    children: ACCOUNT_ROUTES
  }
];
