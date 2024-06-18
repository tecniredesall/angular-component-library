import { Injectable } from '@angular/core';
import { GCCL_APP_DATA } from '../../constants/app-data/app-data.constant';
import { GCCLTAppSlug } from '../../enums/app-data/app-data.enum';
import { GCCLIAppData } from '../../models/app-data/app-data.model';

@Injectable()
export class GCCLAppDataService {
  constructor() {}

  /**
   * It returns an object from the `GCCL_APP_DATA` array, based on the value of the `key` parameter
   * @param {'slug' | 'name' | 'dbName'} key - 'slug' | 'name' | 'dbName'
   * @param {string} value - The value of the key you want to search for.
   * @returns The data for the app that matches the key and value.
   */
  public getDataByKey(
    key: 'slug' | 'name' | 'dbName',
    value: string
  ): GCCLIAppData {
    try {
      let result: GCCLIAppData = null;
      switch (key) {
        case 'slug':
          result = GCCL_APP_DATA[value];
          break;
        case 'name':
          result = this.getDataByInnerProperty('name', value);
          break;

        case 'dbName':
          result = this.getDataByInnerProperty('dbName', value);
          break;

        default:
          break;
      }
      return result;
    } catch (error) {
      return null;
    }
  }

  /**
   * It takes a key and a value, and returns the object that has the value for that key
   * @param {'name' | 'dbName'} key - 'name' | 'dbName'
   * @param {string} value - string - The value of the property you want to search for.
   * @returns the GCCLIAppData object that matches the key and value passed in.
   */
  private getDataByInnerProperty(
    key: 'name' | 'dbName',
    value: string
  ): GCCLIAppData {
    const slugFound = (Object.keys(GCCL_APP_DATA) || []).find(
      (slug: GCCLTAppSlug) => value === GCCL_APP_DATA[slug][key]
    );
    return GCCL_APP_DATA[slugFound];
  }
}
