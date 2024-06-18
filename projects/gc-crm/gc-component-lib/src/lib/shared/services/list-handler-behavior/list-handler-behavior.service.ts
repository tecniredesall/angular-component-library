import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GCCLGenericCrudBehaviorService } from '../../../core/services/generic-crud/generic-crud-behavior.service';

@Injectable()
export class GCCLListHandlerBehaviorService<
  T
> extends GCCLGenericCrudBehaviorService<T> {
  constructor(httpClient: HttpClient) {
    super('', httpClient);
  }
}
