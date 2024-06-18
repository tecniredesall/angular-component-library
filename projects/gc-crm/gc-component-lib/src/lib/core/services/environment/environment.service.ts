import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public BASE_URL_API_CRM = '';
  public BASE_URL_API_TRM = '';
  constructor(@Inject('env') private env: any) {
    this.BASE_URL_API_CRM =
      typeof env?.BASE_URL_API_CRM === 'string'
        ? env.BASE_URL_API_CRM
        : this.BASE_URL_API_CRM;
    this.BASE_URL_API_TRM =
      typeof env?.BASE_URL_API_TRM === 'string'
        ? env.BASE_URL_API_TRM
        : this.BASE_URL_API_TRM;
  }
}
