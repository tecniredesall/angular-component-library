import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GCCLGenericCrudBehaviorService } from '@gc-crm/gc-component-lib';

@Injectable()
export class TableBehaviorService extends GCCLGenericCrudBehaviorService<any> {
  constructor(httpClient: HttpClient) {
    super(
      'https://crm-develop.grainchain.io/api/v1/crm-people/people',
      httpClient
    );
  }
}
