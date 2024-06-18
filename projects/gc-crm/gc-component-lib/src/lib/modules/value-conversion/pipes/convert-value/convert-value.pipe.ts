import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
  catchError,
} from 'rxjs/operators';
import { ComponentConfig } from '../../../../core/models/config/component-config';
import { GCCLEConvertValueStatus } from '../../../../shared/enums/conversions/convert-value-status.enum';
import { GCCLIConversionResponse } from '../../../../shared/models/conversions/convert-value.model';
import { GCCLIDataToConvert } from '../../../../shared/models/conversions/value-to-convert.model';
import { UnitConversionsHttpService } from '../../../../shared/services/unit-conversions/unit-conversions-http.service';
import * as _ from 'lodash';

interface ISubjectValue {
  settings: GCCLIDataToConvert;
  baseConfig: ComponentConfig;
  showFullResponse: boolean;
}

@Pipe({
  name: 'GCCLConvertValue',
  pure: false,
})
export class GCCLConvertValueAsyncPipe implements PipeTransform {
  constructor(private unitConversionsHttpService: UnitConversionsHttpService) {}

  private valueSubject = new BehaviorSubject<ISubjectValue>(null);
  private response$ = this.valueSubject.asObservable().pipe(
    filter((value) => !!value),
    distinctUntilChanged((a, b) => _.isEqual(a?.settings, b?.settings)),
    switchMap((value) => {
      const { showFullResponse } = value || {};
      return from([GCCLEConvertValueStatus.Loading, value]).pipe(
        concatMap((item) => {
          if (GCCLEConvertValueStatus.Loading === item) {
            const response: GCCLIConversionResponse = {
              status: GCCLEConvertValueStatus.Loading,
            };
            return of(this.formatResponse(response, showFullResponse));
          }
          return this.convertValue(value);
        })
      );
    })
  );

  /**
   * It takes a value, and do the conversion to another unit using what is specified in the settings data
   * @param {number} value - The value to convert
   * @param {GCCLIDataToConvert} settings - IDataToConvert - this is the params data that will be sent to the API.
   * @param {ComponentConfig} baseConfig - This is the base configuration for the component.
   * @param [showFullResponse=true] - boolean - if true, the response will be the full response. If false, the response will be the converted value only.
   * @returns Observable<any>
   */
  transform(
    value: number,
    settings: GCCLIDataToConvert,
    baseConfig: ComponentConfig,
    showFullResponse = true
  ): Observable<any> {
    this.valueSubject.next({
      settings: { ...settings, convert: value },
      baseConfig,
      showFullResponse,
    });
    return this.response$;
  }

  /**
   * It takes a value, converts it, and returns the converted value
   * @param {ISubjectValue} value - ISubjectValue
   * @returns Observable<IConvertValue | string | number>
   */
  private convertValue(
    value: ISubjectValue
  ): Observable<GCCLIConversionResponse | string | number> {
    const { showFullResponse } = value || {};
    return this.unitConversionsHttpService
      .convertFromOneUnitToAnother(value?.settings, value?.baseConfig)
      .pipe(
        map((item) => {
          const response: GCCLIConversionResponse = {
            status: GCCLEConvertValueStatus.Converted,
            data: item,
          };
          return this.formatResponse(response, showFullResponse);
        }),
        catchError((_) => {
          const response: GCCLIConversionResponse = {
            status: GCCLEConvertValueStatus.Error,
          };
          return of(this.formatResponse(response, showFullResponse));
        })
      );
  }

  /**
   * It returns the full response object if the `showFullResponse` flag is set to `true`, otherwise it
   * returns the `result` property of the response object
   * @param {GCCLIConversionResponse} conversion - The conversion object response
   * @param {boolean} showFullResponse - boolean - if true, the component will return the full response. If false, it will return the result or status of the conversion.
   * @returns The response is being returned.
   */
  private formatResponse(
    conversion: GCCLIConversionResponse,
    showFullResponse: boolean
  ): GCCLIConversionResponse | string | number {
    let response: GCCLIConversionResponse | string | number = '';
    if (showFullResponse) {
      return {
        ...conversion,
      };
    }
    switch (conversion?.status) {
      case GCCLEConvertValueStatus.Loading:
        response = 'gc-cl.labels.loading';
        break;

      case GCCLEConvertValueStatus.Error:
        response = 'gc-cl.labels.error';
        break;

      default:
        response = conversion?.data?.result;
        break;
    }
    return response;
  }
}
