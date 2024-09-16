import { SimpleChange } from '@angular/core';
import { isEqual } from 'lodash';

export function ifChanged(prop: SimpleChange, callback: (value: any) => void): void {
  if (!isEqual(prop?.previousValue, prop?.currentValue)) {
    callback(true);
  }
}
