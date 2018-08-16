import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";
import { DATE_FORMAT } from "app/shared/constants/input.constants";
import { map } from "rxjs/operators";

import { SERVER_API_URL } from "app/app.constants";
import { createRequestOption } from "app/shared";
import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";

type EntityResponseType = HttpResponse<ISeparationApplicationLog>;
type EntityArrayResponseType = HttpResponse<ISeparationApplicationLog[]>;

@Injectable({ providedIn: "root" })
export class SeparationApplicationLogService {
  private resourceUrl = SERVER_API_URL + "api/separation-application-logs";

  constructor(private http: HttpClient) {}

  create(
    separationApplicationLog: ISeparationApplicationLog
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(separationApplicationLog);
    console.log("create");
    return this.http
      .post<ISeparationApplicationLog>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(
    separationApplicationLog: ISeparationApplicationLog
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(separationApplicationLog);
    return this.http
      .put<ISeparationApplicationLog>(this.resourceUrl, copy, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISeparationApplicationLog>(`${this.resourceUrl}/${id}`, {
        observe: "response"
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeparationApplicationLog[]>(this.resourceUrl, {
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
    separationApplicationLog: ISeparationApplicationLog
  ): ISeparationApplicationLog {
    const copy: ISeparationApplicationLog = Object.assign(
      {},
      separationApplicationLog,
      {
        dateApproved:
          separationApplicationLog.dateApproved != null &&
          separationApplicationLog.dateApproved.isValid()
            ? separationApplicationLog.dateApproved.format(DATE_FORMAT)
            : null,
        dateSubmitted:
          separationApplicationLog.dateSubmitted != null &&
          separationApplicationLog.dateSubmitted.isValid()
            ? separationApplicationLog.dateSubmitted.format(DATE_FORMAT)
            : null,
        dateCompleted:
          separationApplicationLog.dateCompleted != null &&
          separationApplicationLog.dateCompleted.isValid()
            ? separationApplicationLog.dateCompleted.format(DATE_FORMAT)
            : null,
        dateOfLeave:
          separationApplicationLog.dateOfLeave != null &&
          separationApplicationLog.dateOfLeave.isValid()
            ? separationApplicationLog.dateOfLeave.format(DATE_FORMAT)
            : null,
        dateEdited:
          separationApplicationLog.dateEdited != null &&
          separationApplicationLog.dateEdited.isValid()
            ? separationApplicationLog.dateEdited.format(DATE_FORMAT)
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
    res.body.forEach((separationApplicationLog: ISeparationApplicationLog) => {
      separationApplicationLog.dateApproved =
        separationApplicationLog.dateApproved != null
          ? moment(separationApplicationLog.dateApproved)
          : null;
      separationApplicationLog.dateSubmitted =
        separationApplicationLog.dateSubmitted != null
          ? moment(separationApplicationLog.dateSubmitted)
          : null;
      separationApplicationLog.dateCompleted =
        separationApplicationLog.dateCompleted != null
          ? moment(separationApplicationLog.dateCompleted)
          : null;
      separationApplicationLog.dateOfLeave =
        separationApplicationLog.dateOfLeave != null
          ? moment(separationApplicationLog.dateOfLeave)
          : null;
      separationApplicationLog.dateEdited =
        separationApplicationLog.dateEdited != null
          ? moment(separationApplicationLog.dateEdited)
          : null;
    });
    return res;
  }
}
