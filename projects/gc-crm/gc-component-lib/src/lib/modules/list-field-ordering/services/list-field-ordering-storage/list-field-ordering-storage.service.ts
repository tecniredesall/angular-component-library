import { Injectable } from '@angular/core';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import { StorageService } from '../../../../core/services/storage/storage.service';

@Injectable()
export class GCCLFieldItemOrderingStorageService {
  private storageKeys = {
    enabled: 'gc-cl-list-fields-ordering-storage-enabled',
    fields: 'gc-cl-list-fields',
    currentInputFocusedId: 'gc-cl-current-input-focused',
  };
  public uniqueId = '';

  set fields(value: GCCLITableColumn[]) {
    if (!this.enabled) {
      return;
    }
    StorageService.set(`${this.uniqueId}-${this.storageKeys.fields}`, value);
  }

  get fields(): GCCLITableColumn[] {
    if (!this.enabled) {
      return [];
    }

    return (
      StorageService.get(`${this.uniqueId}-${this.storageKeys.fields}`) || []
    );
  }

  set currentInputFocusedId(value: string) {
    StorageService.set(
      `${this.uniqueId}-${this.storageKeys.currentInputFocusedId}`,
      value
    );
  }

  get currentInputFocusedId(): string {
    return (
      StorageService.get(
        `${this.uniqueId}-${this.storageKeys.currentInputFocusedId}`
      ) || ''
    );
  }

  set enabled(value: boolean) {
    if (!this.uniqueId) {
      return;
    }
    StorageService.set(
      `${this.uniqueId}-${this.storageKeys.enabled}`,
      Boolean(value)
    );
  }

  get enabled(): boolean {
    return (
      Boolean(
        StorageService.get(`${this.uniqueId}-${this.storageKeys.enabled}`)
      ) || false
    );
  }

  constructor() {}
}
