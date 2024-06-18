import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oneEmail',
})
export class OneEmailPipe implements PipeTransform {
  transform(person: any, ...args: unknown[]): unknown {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const element = person.emails.find(({ type }) => type === 'principal');
      if (element) {
        return element.value;
      }
      return person.emails[0].value;
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return '';
  }
}
