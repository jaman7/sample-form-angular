import { Injectable } from '@angular/core';

export const APP_PREFIX = 'test-APP';

@Injectable()
export class LocalStorageService {
  setItem(key: string, value: any): void {
    sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string): string | null {
    const item = sessionStorage.getItem(`${APP_PREFIX}${key}`);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
