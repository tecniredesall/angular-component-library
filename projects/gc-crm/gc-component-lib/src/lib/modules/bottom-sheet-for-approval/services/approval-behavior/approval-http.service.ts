import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { IRequest } from '../../../../core/models/request/request.model';
import { EnvironmentService } from '../../../../core/services/environment/environment.service';
import { mapRequestOptions } from '../../../../shared/helpers/http-request-options';
import { IApprovalsModel } from '../../models/approvals.model';

@Injectable()
export class GCCLApprovalHttpService {
  private baseUrl = '';

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    const { BASE_URL_API_TRM } = this.environmentService;
    this.baseUrl = `${BASE_URL_API_TRM}ms-approvals/approvals/`;
  }

  public postNotifications = (id: string, headers: any): Observable<any> => {
    const requestOptions = mapRequestOptions({
      headers: headers,
    });
    const url = `${this.baseUrl}${id}/notification-reminder`;
    return (
      this.http
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .post(url, {}, requestOptions)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .pipe(map((response: any) => response?.data))
    );
  };

  public getApprovers = (
    id: string,
    headers: any
  ): Observable<IApprovalsModel[]> => {
    const requestOptions = mapRequestOptions({
      headers: headers,
    });
    const url = `${this.baseUrl}${id}/status-by-approver`;
    return (
      this.http
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .get(url, requestOptions)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .pipe(map((response: any) => response?.data))
    );
  };
}
