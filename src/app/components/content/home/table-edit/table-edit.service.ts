import { Injectable } from '@angular/core';
import { IFormElements } from '@app/components/commons/form-elements/form-elements.models';

@Injectable({
  providedIn: 'root',
})
export abstract class TableEditService {
  translatePrefix = 'modal';

  formConfig: { [name: string]: IFormElements } = {
    name: {},
    position: { config: { formCellType: 'input-number' } },
    symbol: {},
    weight: { config: { formCellType: 'input-number' } },
  };
}
