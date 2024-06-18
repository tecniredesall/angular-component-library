import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRequest } from '../../models/request/request.model';
import { IResponse } from '../../models/response/response.model';
import { mapRequestOptions } from '../../../shared/helpers/http-request-options';

@Injectable()
export class GCCLGenericCrudHttpService<T> {
  public baseUrl: string;
  constructor(
    @Inject(String) public url: string = '',
    private httpClient: HttpClient
  ) {
    this.baseUrl = url;
  }

  getItems(request?: IRequest): Observable<IResponse> {
    const requestOptions = mapRequestOptions(request);
    return (
      this.httpClient
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .get(this.baseUrl, requestOptions)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        .pipe(map((response: any) => response))
    );
  }

  getItem(id: string, request?: IRequest): Observable<T> {
    const url = `${this.baseUrl}/${id}`;
    const requestOptions = mapRequestOptions(request);
    return (
      this.httpClient
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .get(url, requestOptions)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        .pipe(map((response: any) => response))
    );
  }
}
