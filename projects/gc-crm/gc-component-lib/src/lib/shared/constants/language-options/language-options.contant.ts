import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEsHn from '@angular/common/locales/es-HN';

export const GCCL_LANGUAGE_OPTIONS = {
  PORTUGUESE: {
    code: 'pt-BR',
    name: 'PORTUGUESE',
    country: 'BRAZIL',
    locale: localePt,
    isoCode: 'BRL',
  },
  ENGLISH: {
    code: 'en-US',
    name: 'ENGLISH',
    country: 'USA',
    locale: localeEn,
    isoCode: 'USD',
  },
  SPANISH_MX: {
    code: 'es-MX',
    name: 'SPANISH_MX',
    country: 'MEXICO',
    locale: localeEsMx,
    isoCode: 'MXN',
  },
  SPANISH_HN: {
    code: 'es-HN',
    name: 'SPANISH_HN',
    country: 'HONDURAS',
    locale: localeEsHn,
    isoCode: 'HNL',
  },
};
