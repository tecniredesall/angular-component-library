import { IResponseMeta } from './response-meta.model';

export interface IResponse {
  data?: any;
  _meta?: IResponseMeta;
  path?: string;
  errors?: {
    internal_code: string;
    title: string;
    detail: {
      statusCode: number;
      message: string;
    };
  };
}
