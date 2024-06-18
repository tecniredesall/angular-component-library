import { GCCLTConvertValueStatus as GCCLTConversionResponseStatus } from '../../enums/conversions/convert-value-status.enum';

export interface GCCLIConversionResponseData {
  result: number;
  completeResult: number;
  convert: string;
  from: string;
  to: string;
  type: string;
  factor: number;
  adjustment_type: number;
  fraction_digits: number;
  short?: {
    fraction_digits: number;
    value: number;
  };
}

export interface GCCLIConversionResponse {
  status: GCCLTConversionResponseStatus;
  data?: GCCLIConversionResponseData;
}
