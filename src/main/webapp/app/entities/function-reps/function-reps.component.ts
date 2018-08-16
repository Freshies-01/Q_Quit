import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { JhiEventManager, JhiAlertService } from "ng-jhipster";

import { IFunctionReps } from "app/shared/model/function-reps.model";
import { Principal } from "app/core";
import { FunctionRepsService } from "app/entities/function-reps/function-reps.service";

@Component({
  selector: "jhi-function-reps",
  templateUrl: "./function-reps.component.html"
})
export class FunctionRepsComponent implements OnInit, OnDestroy {
  functionReps: IFunctionReps[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private functionRepsService: FunctionRepsService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.functionRepsService.query().subscribe(
      (res: HttpResponse<IFunctionReps[]>) => {
        this.functionReps = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFunctionReps();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFunctionReps) {
    return item.id;
  }

  registerChangeInFunctionReps() {
    this.eventSubscriber = this.eventManager.subscribe(
      "functionRepsListModification",
      response => this.loadAll()
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
