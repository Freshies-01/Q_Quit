import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { JhiEventManager, JhiAlertService } from "ng-jhipster";

import { IHrReps } from "app/shared/model/hr-reps.model";
import { Principal } from "app/core";
import { HrRepsService } from "app/entities/hr-reps/hr-reps.service";

@Component({
  selector: "jhi-hr-reps",
  templateUrl: "./hr-reps.component.html"
})
export class HrRepsComponent implements OnInit, OnDestroy {
  hrReps: IHrReps[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private hrRepsService: HrRepsService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.hrRepsService.query().subscribe(
      (res: HttpResponse<IHrReps[]>) => {
        this.hrReps = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInHrReps();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHrReps) {
    return item.id;
  }

  registerChangeInHrReps() {
    this.eventSubscriber = this.eventManager.subscribe(
      "hrRepsListModification",
      response => this.loadAll()
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
