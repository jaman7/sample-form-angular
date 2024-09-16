import { HttpParams } from '@angular/common/http';
import moment from 'moment';
import { ParamsDTO } from './http.model';

export function preparedHttpParamsValue(value: any): string {
  if (value instanceof String) {
    return value.toString();
  }
  if (moment.isMoment(value)) {
    return value.format('DD-MM-YYYY');
  }
  if (value instanceof Date) {
    return moment(value).format('DD-MM-YYYY');
  }
  if (Array.isArray(value)) {
    return value.join('&');
  }
  return value.toString();
}

export function getSize<T>(collection: T): number {
  if (Array.isArray(collection)) {
    return collection.length;
  }
  if (typeof collection === 'object' && collection !== null) {
    return Object.keys(collection).length;
  }
  return 0;
}

export function toHttpParams(data: ParamsDTO): HttpParams {
  if (!data) {
    return new HttpParams();
  }
  return Object.entries(data)
    .filter(([, value]) => value && (getSize(value) > 0 || !Array.isArray(value)))
    .reduce((params, [key, value]) => params.set(key, preparedHttpParamsValue(value)), new HttpParams());
}
