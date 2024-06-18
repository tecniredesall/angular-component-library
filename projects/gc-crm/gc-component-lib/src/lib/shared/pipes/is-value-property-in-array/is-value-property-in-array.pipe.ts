import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isValuePropertyInArray',
  pure: false,
})
export class IsValuePropertyInArrayPipe implements PipeTransform {
  transform(items: any[], property: string, value: any): boolean {
    try {
      return items.some(
        (item: any) => this.getValueForProperty(item, property) === value
      );
    } catch (error) {
      return false;
    }
  }

  getValueForProperty = (item: any, property: string): any =>
    (property.split('.') || []).reduce(
      (value, key) =>
        typeof value === 'undefined' || value === null ? value : value[key],
      item
    );
}
