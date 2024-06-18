import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  public static encrypt(value: string): string {
    return btoa(value);
  }

  public static decrypt(value: string): string {
    return atob(value);
  }
}
