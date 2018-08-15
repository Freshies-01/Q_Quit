import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ISepartationApplicationLog } from "app/shared/model/separtation-application-log.model";

@Component({
  selector: "jhi-separtation-application-log-detail",
  templateUrl: "./separtation-application-log-detail.component.html"
})
export class SepartationApplicationLogDetailComponent implements OnInit {
  separtationApplicationLog: ISepartationApplicationLog;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ separtationApplicationLog }) => {
      this.separtationApplicationLog = separtationApplicationLog;
    });
  }

  previousState() {
    window.history.back();
  }
}
