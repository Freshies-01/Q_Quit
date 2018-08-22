import { Component, OnInit } from "@angular/core";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Component({
  selector: "jhi-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  separationApplications: ISeparationApplication[];
  separationApplication: ISeparationApplication;

  cards = [
    {
      title: "Pending Applications",
      content: this.separationApplications
        ? this.separationApplications.length
        : "No Pending Applications",
      cols: 2,
      rows: 1
    },
    {
      title: "Closed Applictations",
      content: this.separationApplications
        ? this.separationApplications.length
        : "No Closed Applications",
      cols: 1,
      rows: 1
    }
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

  ngOnInit() {
    this.loadAll();
  }

  trackId(index: number, item: ISeparationApplication) {
    return item.id;
  }
}
