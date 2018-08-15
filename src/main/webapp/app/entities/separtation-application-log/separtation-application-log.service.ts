import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";
import { DATE_FORMAT } from "app/shared/constants/input.constants";
import { map } from "rxjs/operators";

import { SERVER_API_URL } from "app/app.constants";
import { createRequestOption } from "app/shared";
import { ISepartationApplicationLog } from "app/shared/model/separtation-application-log.model";

type EntityResponseType = HttpResponse<ISepartationApplicationLog>;
type EntityArrayResponseType = HttpResponse<ISepartationApplicationLog[]>;

@Injectable({ providedIn: "root" })
export class SepartationApplicationLogService {
  private resourceUrl = SERVER_API_URL + "api/separtation-application-logs";

  constructor(private http: HttpClient) {}

  create(
    separtationApplicationLog: ISepartationApplicationLog
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(separtationApplicationLog);
    return this.http
      .post<ISepartationApplicationLog>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(
    separtationApplicationLog: ISepartationApplicationLog
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(separtationApplicationLog);
    return this.http
      .put<ISepartationApplicationLog>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISepartationApplicationLog>(`${this.resourceUrl}/${id}`, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISepartationApplicationLog[]>(this.resourceUrl, {
        params: options,
        observe: "response"
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: "response"
    });
  }

  private convertDateFromClient(
    separtationApplicationLog: ISepartationApplicationLog
  ): ISepartationApplicationLog {
    const copy: ISepartationApplicationLog = Object.assign(
      {},
      separtationApplicationLog,
      {
        dateApproved:
          separtationApplicationLog.dateApproved != null &&
          separtationApplicationLog.dateApproved.isValid()
            ? separtationApplicationLog.dateApproved.format(DATE_FORMAT)
            : null,
        dateSubmitted:
          separtationApplicationLog.dateSubmitted != null &&
          separtationApplicationLog.dateSubmitted.isValid()
            ? separtationApplicationLog.dateSubmitted.format(DATE_FORMAT)
            : null,
        dateCompleted:
          separtationApplicationLog.dateCompleted != null &&
          separtationApplicationLog.dateCompleted.isValid()
            ? separtationApplicationLog.dateCompleted.format(DATE_FORMAT)
            : null,
        dateOfLeave:
          separtationApplicationLog.dateOfLeave != null &&
          separtationApplicationLog.dateOfLeave.isValid()
            ? separtationApplicationLog.dateOfLeave.format(DATE_FORMAT)
            : null,
        dateEdited:
          separtationApplicationLog.dateEdited != null &&
          separtationApplicationLog.dateEdited.isValid()
            ? separtationApplicationLog.dateEdited.format(DATE_FORMAT)
            : null
      }
    );
    return copy;
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    res.body.dateApproved =
      res.body.dateApproved != null ? moment(res.body.dateApproved) : null;
    res.body.dateSubmitted =
      res.body.dateSubmitted != null ? moment(res.body.dateSubmitted) : null;
    res.body.dateCompleted =
      res.body.dateCompleted != null ? moment(res.body.dateCompleted) : null;
    res.body.dateOfLeave =
      res.body.dateOfLeave != null ? moment(res.body.dateOfLeave) : null;
    res.body.dateEdited =
      res.body.dateEdited != null ? moment(res.body.dateEdited) : null;
    return res;
  }

  private convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    res.body.forEach(
      (separtationApplicationLog: ISepartationApplicationLog) => {
        separtationApplicationLog.dateApproved =
          separtationApplicationLog.dateApproved != null
            ? moment(separtationApplicationLog.dateApproved)
            : null;
        separtationApplicationLog.dateSubmitted =
          separtationApplicationLog.dateSubmitted != null
            ? moment(separtationApplicationLog.dateSubmitted)
            : null;
        separtationApplicationLog.dateCompleted =
          separtationApplicationLog.dateCompleted != null
            ? moment(separtationApplicationLog.dateCompleted)
            : null;
        separtationApplicationLog.dateOfLeave =
          separtationApplicationLog.dateOfLeave != null
            ? moment(separtationApplicationLog.dateOfLeave)
            : null;
        separtationApplicationLog.dateEdited =
          separtationApplicationLog.dateEdited != null
            ? moment(separtationApplicationLog.dateEdited)
            : null;
      }
    );
    return res;
  }
}
