import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

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
    return this.http.post<ISepartationApplicationLog>(
      this.resourceUrl,
      separtationApplicationLog,
      { observe: "response" }
    );
  }

  update(
    separtationApplicationLog: ISepartationApplicationLog
  ): Observable<EntityResponseType> {
    return this.http.put<ISepartationApplicationLog>(
      this.resourceUrl,
      separtationApplicationLog,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISepartationApplicationLog>(
      `${this.resourceUrl}/${id}`,
      { observe: "response" }
    );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISepartationApplicationLog[]>(this.resourceUrl, {
      params: options,
      observe: "response"
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: "response"
    });
  }
}
