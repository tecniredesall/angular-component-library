import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstAndMiddleName',
})
export class FirstAndMiddleNamePipe implements PipeTransform {
  transform(person: any): string {
    const { first_name, middle_name } = person;
    return `${first_name} ${middle_name || ''}`.trim();
  }
}
