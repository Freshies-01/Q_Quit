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
    res.body.dateEdited =
      res.body.dateEdited != null ? moment(res.body.dateEdited) : null;
    return res;
  }

  private convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    res.body.forEach(
      (separtationApplicationLog: ISepartationApplicationLog) => {
        separtationApplicationLog.dateEdited =
          separtationApplicationLog.dateEdited != null
            ? moment(separtationApplicationLog.dateEdited)
            : null;
      }
    );
    return res;
  }
}
