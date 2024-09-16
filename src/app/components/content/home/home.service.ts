import { Injectable } from '@angular/core';
import { ITableColumn } from '@app/components/commons/table/table.models';
import { HttpService } from '@app/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class HomeService extends HttpService {
  API_URL = 'assets/mockData.json';

  getData(): Observable<any> {
    return this.http.get(this.API_URL, {});
  }

  columnConfig: { [name: string]: ITableColumn } = {
    position: {},
    name: {},
    weight: {},
    symbol: {},
  };
}
