import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';
import { toHttpParams } from './http.utils';
import { HttpOptions, HttpRequestOptions, ParamsDTO } from './http.model';

@Injectable()
export abstract class HttpService {
  constructor(public http: HttpClient) {}

  protected get<T>(url: string, options: HttpOptions = {}): Observable<T> {
    return this.http.get<T>(env.SERVER_API_URL + url, {
      ...options,
      params: toHttpParams(options.params as ParamsDTO),
    });
  }

  protected post<T>(url: string, data: any, options: HttpOptions = {}): Observable<T> {
    return this.http.post<T>(env.SERVER_API_URL + url, data, {
      ...options,
      params: toHttpParams(options.params as ParamsDTO),
    });
  }

  protected patch<T>(url: string, data: any, options: HttpOptions = {}): Observable<T> {
    return this.http.patch<T>(env.SERVER_API_URL + url, data, {
      ...options,
      params: toHttpParams(options.params as ParamsDTO),
    });
  }

  protected put<T>(url: string, data: any, options: HttpOptions = {}): Observable<T> {
    return this.http.put<T>(env.SERVER_API_URL + url, data, {
      ...options,
      params: toHttpParams(options.params as ParamsDTO),
    });
  }

  protected delete<T>(url: string, options: HttpOptions = {}): Observable<T> {
    return this.http.delete<T>(env.SERVER_API_URL + url, {
      ...options,
      params: toHttpParams(options.params as ParamsDTO),
    });
  }

  protected response(method: string, url: string, options: HttpRequestOptions = {}): Observable<any> {
    return this.http.request(method, env.SERVER_API_URL + url, {
      ...options,
      body: options.body,
      params: toHttpParams(options.params as ParamsDTO),
    });
  }
}
