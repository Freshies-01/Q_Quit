import { Component, OnInit } from "@angular/core";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { PENDING } from "../../../../../../node_modules/@angular/forms/src/model";
import { Status } from "app/shared/model/separtation-application-log.model";

@Component({
  selector: "jhi-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  separationApplications: ISeparationApplication[];
  pendingApplications: ISeparationApplication[];
  closedApplications: ISeparationApplication[];
  separationApplication: ISeparationApplication;

  numPending = 0;
  numClosed = 0;

  cards = [
    { title: "Pending", cols: 2, rows: 1 },
    { title: "Closed", cols: 1, rows: 1 }
    // { title: "Card 3", content: "card content here", cols: 1, rows: 2 },
    // { title: "Card 4", content: "card content here", cols: 1, rows: 1 }
  ];

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

  loadAll() {
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadPending() {
    this.separationApplicationService.queryPending().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.pendingApplications = res.body;
        this.numPending = this.pendingApplications.length;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadClosed() {
    this.separationApplicationService.queryClosed().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.closedApplications = res.body;
        this.numClosed = this.closedApplications.length;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  ngOnInit() {
    this.loadPending();
    this.loadClosed();
  }

  trackId(index: number, item: ISeparationApplication) {
    return item.id;
  }
}
