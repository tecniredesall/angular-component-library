import { Pipe, PipeTransform } from '@angular/core';
import { ComponentConfig } from '../../../../core/models/config/component-config';
import { LANGUAGE_FORMATS } from '../../../../core/constants/language-formats.constant';

@Pipe({
  name: 'gcDateFormat',
  pure: false,
})
export class GcDateFormatPipe implements PipeTransform {
  transform({ lang }: ComponentConfig): string {
    const language = lang.split('-')[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return LANGUAGE_FORMATS[language]?.date;
  }
}
