/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onePhone',
})
export class OnePhonePipe implements PipeTransform {
  transform(person: any, ...args: unknown[]): unknown {
    let phone: any;
    try {
      // @ts-ignore
      const element = person.phones.find(({ type }) => type === 'principal');
      phone = element || person.phones[0];
      // eslint-disable-next-line no-empty
    } catch (e) {}
    // @ts-ignore
    return phone ? `(${phone.calling_code}) ${phone.phone_number}` : '';
  }
}
