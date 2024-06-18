import { Pipe, PipeTransform } from '@angular/core';
import { GCCLIGeneralLanguage } from '../../models/general-language/general-language.interface';

@Pipe({
  name: 'gcTranslate',
  pure: false,
})
export class GcTranslatePipe implements PipeTransform {
  transform(args: GCCLIGeneralLanguage | any, lang = 'default'): string {
    try {
      let translate = args[lang];

      if (!translate) {
        const codeLang = lang.split('-')[0];
        translate = args[codeLang];
      }

      return translate ?? args?.default;
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return '';
  }
}
