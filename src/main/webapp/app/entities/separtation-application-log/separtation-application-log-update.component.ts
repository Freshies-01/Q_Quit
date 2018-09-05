import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { ISepartationApplicationLog } from "app/shared/model/separtation-application-log.model";
import { SepartationApplicationLogService } from "./separtation-application-log.service";

@Component({
  selector: "jhi-separtation-application-log-update",
  templateUrl: "./separtation-application-log-update.component.html"
})
export class SepartationApplicationLogUpdateComponent implements OnInit {
  private _separtationApplicationLog: ISepartationApplicationLog;
  isSaving: boolean;

  constructor(
    private separtationApplicationLogService: SepartationApplicationLogService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ separtationApplicationLog }) => {
      this.separtationApplicationLog = separtationApplicationLog;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.separtationApplicationLog.id !== undefined) {
      this.subscribeToSaveResponse(
        this.separtationApplicationLogService.update(
          this.separtationApplicationLog
        )
      );
    } else {
      this.subscribeToSaveResponse(
        this.separtationApplicationLogService.create(
          this.separtationApplicationLog
        )
      );
    }
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<ISepartationApplicationLog>>
  ) {
    result.subscribe(
      (res: HttpResponse<ISepartationApplicationLog>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
  get separtationApplicationLog() {
    return this._separtationApplicationLog;
  }

  set separtationApplicationLog(
    separtationApplicationLog: ISepartationApplicationLog
  ) {
    this._separtationApplicationLog = separtationApplicationLog;
  }
}
