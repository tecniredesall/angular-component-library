import { createNumberMask } from 'text-mask-addons';
import {
  GCCLIQuantityMask,
  GCCLIQuantityOptionsMask,
  GCCLCQuantityMask,
} from '../models/quantity-mask.model';
import {
  getLocaleNumberSymbol,
  NumberSymbol,
  getCurrencySymbol,
} from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { GCCL_LANGUAGE_OPTIONS } from '../../../public-api';

export const GCCLQuantityMask = (
  value: GCCLIQuantityOptionsMask
): GCCLIQuantityMask => {
  try {
    const { locale, code, isoCode } = Object.values(
      GCCL_LANGUAGE_OPTIONS
    ).filter((f) => f.code === value.languageCode)[0] || {
      locale: GCCL_LANGUAGE_OPTIONS.SPANISH_MX.locale,
      code: GCCL_LANGUAGE_OPTIONS.SPANISH_MX.code,
    };
    registerLocaleData(locale);

    const quantity = new GCCLCQuantityMask(value);

    quantity.thousandsSeparatorSymbol = getLocaleNumberSymbol(
      code,
      NumberSymbol.Group
    );
    quantity.decimalSymbol = getLocaleNumberSymbol(code, NumberSymbol.Decimal);
    return createNumberMask({
      ...quantity,
      prefix: value.currency
        ? getCurrencySymbol(value.prefix ?? isoCode, quantity.formatCurrency)
        : value.prefix ?? '',
    });
  } catch (error) {
    return null;
  }
};

export const GCCLQuantityStringToNumber = (
  value: string,
  languageCode: string,
  allowNull = false
): number => {
  try {
    const decimalSeparator = getLocaleNumberSymbol(
      languageCode,
      NumberSymbol.Decimal
    );
    const regExp = new RegExp(`[^0-9\\-\\${decimalSeparator}]`, 'gm');
    const text = value
      .toString()
      .replace(regExp, '')
      .replace(decimalSeparator, '.');
    return 0 === text.length ? (allowNull ? null : 0) : +text;
  } catch (error) {
    return allowNull ? null : 0;
  }
};

export const GCCLQuantityNumberToString = (
  value: number,
  languageCode: string,
  allowNull = false
): string => {
  try {
    const decimalSeparator = getLocaleNumberSymbol(
      languageCode,
      NumberSymbol.Decimal
    );
    const text = value
      .toString()
      .replace(/[^0-9\-\\.]/gm, '')
      .replace('.', decimalSeparator);
    return 0 === text.length ? (allowNull ? null : '') : text;
  } catch (error) {
    return allowNull ? null : '';
  }
};
