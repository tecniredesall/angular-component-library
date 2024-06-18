import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto/crypto.service';
import { EWebStorage } from '../../types/web-storage/web-storage.type';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Get the anything from web storage
   */
  public static get(
    key: string,
    from: EWebStorage = EWebStorage.SessionStorage,
    enableStorageEncryption = true
  ): any {
    const storage = this.getWebStorage(from);
    let value: any;
    const encryptedKey = enableStorageEncryption
      ? CryptoService.encrypt(key)
      : key;
    const valueEncrypted = storage.getItem(encryptedKey);
    if (valueEncrypted === null) {
      return valueEncrypted;
    }
    const valueDecrypted = enableStorageEncryption
      ? CryptoService.decrypt(valueEncrypted)
      : valueEncrypted;
    try {
      value = JSON.parse(valueDecrypted);
    } catch (e) {
      value = valueDecrypted;
    }
    return value;
  }

  /**
   * Storage the anything in web storage
   */
  public static set(
    key: string,
    value: any,
    to: EWebStorage = EWebStorage.SessionStorage,
    enableStorageEncryption = true
  ): void {
    const storage = this.getWebStorage(to);

    const valueToString = JSON.stringify(value);
    const encryptedValue = enableStorageEncryption
      ? CryptoService.encrypt(valueToString)
      : valueToString;
    const encryptedKey = enableStorageEncryption
      ? CryptoService.encrypt(key)
      : key;
    storage.setItem(encryptedKey, encryptedValue);
  }

  private static getWebStorage = (storage: EWebStorage): Storage => {
    switch (storage) {
      case EWebStorage.LocalStorage:
        return localStorage;
      case EWebStorage.SessionStorage:
        return sessionStorage;
    }
  };

  public static clear = (
    key?: string,
    webStorage: EWebStorage = EWebStorage.SessionStorage,
    enableStorageEncryption = true
  ): void => {
    const storage = StorageService.getWebStorage(webStorage);

    if (key) {
      const encryptedKey = enableStorageEncryption
        ? CryptoService.encrypt(key)
        : key;
      storage.removeItem(encryptedKey);
    } else {
      storage.clear();
    }
  };
}
