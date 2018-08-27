import { Component, OnInit } from "@angular/core";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { LoginModalService, Principal, Account } from "app/core";
import { JhiEventManager } from "ng-jhipster";

@Component({
  selector: "jhi-separation-application-list",
  templateUrl: "./separation-application-list.component.html",
  styleUrls: ["./separation-application-list.component.css"]
})
export class SeparationApplicationListComponent implements OnInit {
  separationApplications: ISeparationApplication[];
  pendingApplications: ISeparationApplication[];
  closedApplications: ISeparationApplication[];
  applications: ISeparationApplication[];
  separationApplication: ISeparationApplication;
  account: Account;

  mode = "determinate";
  value = 100;

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager
  ) {}

  queryApps() {
    this.separationApplicationService.findByLogin().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
        this.applications = this.separationApplications;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadAll() {
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
        this.applications = this.separationApplications;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  loadPending() {
    this.separationApplicationService.queryPending().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.pendingApplications = res.body;
        this.applications = this.pendingApplications;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  loadClosed() {
    this.separationApplicationService.queryClosed().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.closedApplications = res.body;
        this.applications = this.closedApplications;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  getCurrentLoginUser() {
    this.principal.identity().then(account => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe("authenticationSuccess", message => {
      this.principal.identity().then(account => {
        this.account = account;
      });
    });
  }

  filterAll() {
    this.loadAll();
  }

  filterPending() {
    this.loadPending();
  }

  filterClosed() {
    this.loadClosed();
  }

  ngOnInit() {
    // this.loadAll();
    // this.getCurrentLoginUser();
    // this.loadUserApplications();
    this.queryApps();
  }

  trackId(index: number, item: ISeparationApplication) {
    return item.id;
  }
}
