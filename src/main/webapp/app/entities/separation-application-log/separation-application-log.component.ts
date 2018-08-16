import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { JhiEventManager, JhiParseLinks, JhiAlertService } from "ng-jhipster";

import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";
import { Principal } from "app/core";

import { ITEMS_PER_PAGE } from "app/shared";
import { SeparationApplicationLogService } from "app/entities/separation-application-log/separation-application-log.service";

@Component({
  selector: "jhi-separation-application-log",
  templateUrl: "./separation-application-log.component.html"
})
export class SeparationApplicationLogComponent implements OnInit, OnDestroy {
  currentAccount: any;
  separationApplicationLogs: ISeparationApplicationLog[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    private separationApplicationLogService: SeparationApplicationLogService,
    private parseLinks: JhiParseLinks,
    private jhiAlertService: JhiAlertService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.separationApplicationLogService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISeparationApplicationLog[]>) =>
          this.paginateseparationApplicationLogs(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(["/separation-application-log"], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + "," + (this.reverse ? "asc" : "desc")
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      "/separation-application-log",
      {
        page: this.page,
        sort: this.predicate + "," + (this.reverse ? "asc" : "desc")
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInseparationApplicationLogs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISeparationApplicationLog) {
    return item.id;
  }

  registerChangeInseparationApplicationLogs() {
    this.eventSubscriber = this.eventManager.subscribe(
      "separationApplicationLogListModification",
      response => this.loadAll()
    );
  }

  sort() {
    const result = [this.predicate + "," + (this.reverse ? "asc" : "desc")];
    if (this.predicate !== "id") {
      result.push("id");
    }
    return result;
  }

  private paginateseparationApplicationLogs(
    data: ISeparationApplicationLog[],
    headers: HttpHeaders
  ) {
    this.links = this.parseLinks.parse(headers.get("link"));
    this.totalItems = parseInt(headers.get("X-Total-Count"), 10);
    this.queryCount = this.totalItems;
    this.separationApplicationLogs = data;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
