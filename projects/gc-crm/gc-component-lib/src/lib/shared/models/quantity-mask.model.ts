import { GCCLTFormatCurrency } from '../enums/format-currency';

export interface GCCLIQuantityOptionsMask {
  languageCode: string;
  currency?: boolean;
  prefix?: string;
  suffix?: string;
  decimalLimit?: number;
  integerLimit?: number;
  allowNegative?: boolean;
  formatCurrency?: GCCLTFormatCurrency;
}

export interface GCCLIQuantityMask {
  prefix?: string;
  suffix: string;
  includeThousandsSeparator?: boolean;
  thousandsSeparatorSymbol?: string;
  allowDecimal: boolean;
  decimalSymbol: string;
  decimalLimit: number;
  integerLimit: number;
  requireDecimal?: boolean;
  allowNegative?: boolean;
  allowLeadingZeroes?: boolean;
}

export class GCCLCQuantityMask implements GCCLIQuantityMask {
  public prefix = '';
  public suffix = '';
  public includeThousandsSeparator = true;
  public thousandsSeparatorSymbol = '';
  public allowDecimal = true;
  public decimalSymbol = '';
  public decimalLimit = 2;
  public integerLimit = null;
  public requireDecimal = false;
  public allowNegative = false;
  public allowLeadingZeroes = false;
  public formatCurrency: GCCLTFormatCurrency = 'wide';

  constructor(value?: GCCLIQuantityOptionsMask) {
    if (value) {
      this.suffix = value.suffix ?? this.suffix;
      this.decimalLimit = value.decimalLimit ?? this.decimalLimit;
      this.integerLimit = value.integerLimit ?? this.integerLimit;
      this.allowNegative = value.allowNegative ?? this.allowNegative;
      this.formatCurrency = value.formatCurrency ?? this.formatCurrency;
    }
  }
}
