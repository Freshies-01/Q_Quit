import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoginModalService, LoginService, Principal } from "app/core";

import { Subscription } from "rxjs/index";

@Component({
  selector: "jhi-alternative-main",
  templateUrl: "./alternative-main.component.html",
  styleUrls: ["./alternative-main.component.css"]
})
export class AlternativeMainComponent implements OnInit, OnDestroy {
  private authStateSubscription: Subscription;

  constructor(
    private loginModalService: LoginModalService,
    private loginService: LoginService,
    private principal: Principal
  ) {}

  ngOnInit() {
    // if (!this.principal.isAuthenticated()) {
    //   this.loginModalService.open();
    // }
    // this.authStateSubscription = this.principal
    //   .getAuthenticationState()
    //   .subscribe(
    //     value => {
    //       if (value === null) {
    //         this.loginModalService.open();
    //       }
    //     },
    //     error => console.log(error)
    //   );
  }

  ngOnDestroy() {
    // this.authStateSubscription.unsubscribe();
  }
}
