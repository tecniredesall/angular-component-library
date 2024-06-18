import { Pipe, PipeTransform } from '@angular/core';
import { GCCLIAppData } from '../../models/app-data/app-data.model';
import { GCCLAppDataService } from '../../services/app-data/app-data.service';

@Pipe({
  name: 'gcclAppData',
})
export class GCCLAppDataPipe implements PipeTransform {
  constructor(private appDataService: GCCLAppDataService) {}

  /**
   * It takes a key and a value, and returns the data from the appDataService that matches the key and
   * value
   * @param {'slug' | 'name' | 'dbName'} key - The key to search by.
   * @param {string} value - The value of the key to search for.
   * @returns The GCCLIAppData object.
   */
  transform(key: 'slug' | 'name' | 'dbName', value: string): GCCLIAppData {
    return this.appDataService.getDataByKey(key, value);
  }
}
