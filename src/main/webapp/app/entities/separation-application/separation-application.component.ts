import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { JhiEventManager, JhiAlertService } from "ng-jhipster";

import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { Principal } from "app/core";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { ActionService } from "app/entities/action";
import { IAction } from "app/shared/model/action.model";
@Component({
  selector: "jhi-separation-application",
  templateUrl: "./separation-application.component.html"
})
export class SeparationApplicationComponent implements OnInit, OnDestroy {
  separationApplications: ISeparationApplication[];
  actions: IAction[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private actionSerivce: ActionService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.actionSerivce.test(2).subscribe((res: HttpResponse<IAction[]>) => {
      this.actions = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSeparationApplications();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISeparationApplication) {
    return item.id;
  }

  registerChangeInSeparationApplications() {
    this.eventSubscriber = this.eventManager.subscribe(
      "separationApplicationListModification",
      response => this.loadAll()
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
