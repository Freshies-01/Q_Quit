import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { JhiEventManager, JhiAlertService } from "ng-jhipster";

import { IAction } from "app/shared/model/action.model";
import { Principal } from "app/core";
import { ActionService } from "./action.service";
import { Moment, isMoment } from "moment";
import { DepartmentCodes } from "app/shared/model/department.model";

@Component({
  selector: "jhi-action",
  templateUrl: "./action.component.html"
})
export class ActionComponent implements OnInit, OnDestroy {
  actions: IAction[];
  currentAccount: any;
  eventSubscriber: Subscription;
  calculationList: [{ departmentName: DepartmentCodes; duration: number }];
  calcListIndex: 1;
  constructor(
    private actionService: ActionService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  functionWiseDuration() {
    this.actionService.actionsByDepartment(this.calcListIndex).subscribe(
      (res: HttpResponse<IAction[]>) => {
        this.actions = res.body;
        this.actions.forEach(action => {
          this.calculationList[this.calcListIndex - 1] = {
            departmentName: action.functionReps.employee.department.name,
            duration: this.calcDuration(
              this.calculationList[this.calcListIndex - 1].duration,
              action.dateCompleted,
              action.separationApplication.dateApproved
            )
          };
        });
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  calcDuration(
    previousValue: number,
    dateCompleted: Moment,
    dateApproved: Moment
  ) {
    if (previousValue == null) {
      return dateCompleted.diff(dateApproved);
    }
    return (dateCompleted.diff(dateApproved) + previousValue) / 2;
  }

  loadAll() {
    this.actionService.findActionsBySAID(2).subscribe(
      (res: HttpResponse<IAction[]>) => {
        this.actions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInActions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAction) {
    return item.id;
  }

  registerChangeInActions() {
    this.eventSubscriber = this.eventManager.subscribe(
      "actionListModification",
      response => this.loadAll()
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
