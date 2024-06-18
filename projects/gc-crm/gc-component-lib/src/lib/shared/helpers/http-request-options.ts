import { HttpParams } from '@angular/common/http';
import { IRequest } from '../../core/models/request/request.model';

/**
 * It takes an object with a params and headers property, and returns an object with a params and
 * headers property in HttpClient format
 * @param {IRequest} [request] - IRequest - this is the request object with a params and headers property that we will be sending to the
 * server.
 * @returns An object with two properties: params and headers in HttpClient format.
 */
export const mapRequestOptions = (request?: IRequest): any => {
  const requestData = {
    params: request?.params ?? {},
    headers: request?.headers ?? {},
  };
  return {
    params: new HttpParams({ fromObject: { ...(requestData.params ?? {}) } }),
    headers: { ...requestData.headers },
  };
};
