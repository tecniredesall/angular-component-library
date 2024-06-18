import { GCCLTRequestStatus } from '../../enums/request/request.enum';

export interface GCCLIRequestResponse<T> {
  data?: T;
  status: GCCLTRequestStatus;
}
