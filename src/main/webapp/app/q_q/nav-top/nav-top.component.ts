import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

import { LoginModalService, LoginService, Principal } from "app/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "jhi-nav-top",
  templateUrl: "./nav-top.component.html",
  styleUrls: ["./nav-top.component.css"]
})
export class NavTopComponent {
  @Output() toogleNav = new EventEmitter();
  private modalReference: NgbModalRef;

  constructor(
    private loginModalService: LoginModalService,
    private loginService: LoginService,
    private principal: Principal,
    private router: Router
  ) {}

  signIn() {
    this.modalReference = this.loginModalService.open();
  }

  signOut() {
    this.loginService.logout();
    this.router.navigate(["Q_Q"]);
  }

  isAuthenticated(): Boolean {
    return this.principal.isAuthenticated();
  }
}
