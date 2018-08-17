import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "app/core/login/login.service";
import { StateStorageService } from "app/core/auth/state-storage.service";

@Component({
  selector: "jhi-login-page",
  templateUrl: "./login-page.component.html"
})
export class LoginPageComponent implements OnInit {
  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;

  constructor(
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {
    this.credentials = { test: "sdfsd" };
    this.loginService.logout();
  }

  ngOnInit() {}

  login() {
    console.log("whatsup");
    this.loginService
      .login({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .then(() => {
        this.authenticationError = false;
        if (
          this.router.url === "/register" ||
          /^\/activate\//.test(this.router.url) ||
          /^\/reset\//.test(this.router.url)
        ) {
          this.router.navigate([""]);
        }

        // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // // since login is succesful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigate([redirect]);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }
}
