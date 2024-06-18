import { Injectable } from '@angular/core';
import { ComponentConfig } from '../../../../core/models/config/component-config';
import { GCCLEConvertValueStatus } from '../../../../shared/enums/conversions/convert-value-status.enum';
import { GCCLERequestStatus } from '../../../../shared/enums/request/request.enum';
import { GCCLIConversionResponse } from '../../../../shared/models/conversions/convert-value.model';
import { GCCLIDataToConvert } from '../../../../shared/models/conversions/value-to-convert.model';
import { GCCLIRequestResponse } from '../../../../shared/models/request/request.model';
import { UnitConversionsHttpService } from '../../../../shared/services/unit-conversions/unit-conversions-http.service';
import { GCCLICurrency } from '../../../currency-select/models/currency.model';

@Injectable()
export class GCCLUnitConversionsBehaviorService {
  constructor(private unitConversionsHttpService: UnitConversionsHttpService) {}

  /**
   * It takes a object with the data to convert and a baseConfig object, and returns a promise that resolves to a GCCLIConversionResponse object
   * @param {GCCLIDataToConvert} data - The data to convert.
   * @param {ComponentConfig} baseConfig - This is the base configuration for the component.
   * @returns {GCCLIConversionResponse} A promise that resolves to a  object.
   */
  public async convertFromOneUnitToAnother(
    data: GCCLIDataToConvert,
    baseConfig: ComponentConfig
  ): Promise<GCCLIConversionResponse> {
    try {
      const response = await this.unitConversionsHttpService
        .convertFromOneUnitToAnother(data, baseConfig)
        .toPromise();
      return {
        status: GCCLEConvertValueStatus.Converted,
        data: response,
      };
    } catch (error) {
      return {
        status: GCCLEConvertValueStatus.Error,
      };
    }
  }

  public async getCurrencies(
    baseConfig: ComponentConfig
  ): Promise<GCCLIRequestResponse<GCCLICurrency[]>> {
    try {
      const response = await this.unitConversionsHttpService
        .getCurrencies(baseConfig)
        .toPromise();
      return {
        data: response,
        status: GCCLERequestStatus.Success,
      };
    } catch (error) {
      return {
        status: GCCLERequestStatus.Error,
      };
    }
  }
}
