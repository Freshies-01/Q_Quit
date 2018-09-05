import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";

@Component({
  selector: "jhi-separation-application-log-detail",
  templateUrl: "./separation-application-log-detail.component.html"
})
export class SeparationApplicationLogDetailComponent implements OnInit {
  separationApplicationLog: ISeparationApplicationLog;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ separationApplicationLog }) => {
      this.separationApplicationLog = separationApplicationLog;
    });
  }

  previousState() {
    window.history.back();
  }
}
