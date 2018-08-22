import { Component, OnInit } from "@angular/core";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

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

  mode = "determinate";
  value = 100;

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

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
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  loadClosed() {
    this.separationApplicationService.queryClosed().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.closedApplications = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  reload() {
    this.value = parseFloat(
      (<HTMLInputElement>document.getElementById("list-filter")).value
    );
  }

  ngOnInit() {
    this.loadAll();
    this.loadPending();
    this.loadClosed();
  }

  trackId(index: number, item: ISeparationApplication) {
    return item.id;
  }
}
