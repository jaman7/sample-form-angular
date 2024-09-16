import { HttpHeaders } from '@angular/common/http';

export type HttpObserveType = 'body' | 'events' | 'response';

export interface ParamsDTO {
  [param: string]: number | number[] | string | string[] | boolean | boolean[];
}

export class HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };

  observe?: 'body';

  params?: ParamsDTO;

  reportProgress?: boolean;

  responseType?: 'json';

  withCredentials?: boolean;
}

export class HttpRequestOptions {
  body?: any;

  headers?: HttpHeaders | { [header: string]: string | string[] };

  params?: {
    [param: string]: string | string[];
  };

  observe?: HttpObserveType;

  reportProgress?: boolean;

  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';

  withCredentials?: boolean;
}
