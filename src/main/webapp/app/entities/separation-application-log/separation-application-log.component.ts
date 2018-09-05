import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { JhiEventManager, JhiAlertService } from "ng-jhipster";

import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";
import { Principal } from "app/core";
import { SeparationApplicationLogService } from "./separation-application-log.service";

@Component({
  selector: "jhi-separation-application-log",
  templateUrl: "./separation-application-log.component.html"
})
export class SeparationApplicationLogComponent implements OnInit, OnDestroy {
  separationApplicationLogs: ISeparationApplicationLog[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private separationApplicationLogService: SeparationApplicationLogService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.separationApplicationLogService.query().subscribe(
      (res: HttpResponse<ISeparationApplicationLog[]>) => {
        this.separationApplicationLogs = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSeparationApplicationLogs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISeparationApplicationLog) {
    return item.id;
  }

  registerChangeInSeparationApplicationLogs() {
    this.eventSubscriber = this.eventManager.subscribe(
      "separationApplicationLogListModification",
      response => this.loadAll()
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
