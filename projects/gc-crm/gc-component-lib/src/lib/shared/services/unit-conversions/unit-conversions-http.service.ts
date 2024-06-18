import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentConfig } from '../../../core/models/config/component-config';
import { EnvironmentService } from '../../../core/services/environment/environment.service';
import { GCCLICurrency } from '../../../modules/currency-select/models/currency.model';
import { GCCLIWeightUnit } from '../../../modules/weight-unit-select/models/weight-unit/weight-unit.model';
import { mapRequestOptions } from '../../helpers/http-request-options';
import { GCCLIConversionResponseData } from '../../models/conversions/convert-value.model';
import { GCCLIDataToConvert } from '../../models/conversions/value-to-convert.model';

@Injectable()
export class UnitConversionsHttpService {
  private baseUrl = '';
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    const { BASE_URL_API_CRM } = this.environmentService;
    this.baseUrl = `${BASE_URL_API_CRM}unit-conversions/units`;
  }

  /**
   * It takes a object with the data to convert and a baseConfig object, and returns an observable of the converted value
   * @param {GCCLIDataToConvert} data - IDataToConvert - this is the data that will be sent to the API.
   * @param {ComponentConfig} baseConfig - ComponentConfig
   * @returns The converted value
   */
  public convertFromOneUnitToAnother(
    data: GCCLIDataToConvert,
    baseConfig: ComponentConfig
  ): Observable<GCCLIConversionResponseData> {
    const { unit_type, ...rest } = data;
    const { partitionKey } = baseConfig || {};
    const url = `${this.baseUrl}/${unit_type}`;
    const requestOptions = mapRequestOptions({
      headers: { 'pk-organization': partitionKey },
      params: rest,
    });
    return this.http
      .get(url, requestOptions)
      .pipe(map((response: any) => response?.data));
  }

  public getWeightUnits = (
    baseConfig: ComponentConfig
  ): Observable<GCCLIWeightUnit[]> => {
    const { partitionKey } = baseConfig || {};
    const url = `${this.baseUrl}/weight`;
    const requestOptions = mapRequestOptions({
      headers: { 'pk-organization': partitionKey },
    });
    return this.http
      .get(url, requestOptions)
      .pipe(map((response: any) => response?.data));
  };

  public getCurrencies = (
    baseConfig: ComponentConfig
  ): Observable<GCCLICurrency[]> => {
    const { partitionKey } = baseConfig || {};
    const url = `${this.baseUrl}/currency`;
    const requestOptions = mapRequestOptions({
      headers: { 'pk-organization': partitionKey },
    });
    return this.http
      .get(url, requestOptions)
      .pipe(map((response: any) => response?.data));
  };
}
