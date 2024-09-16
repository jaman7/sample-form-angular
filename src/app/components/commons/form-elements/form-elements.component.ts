import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ConfigDefault, IFormElements } from './form-elements.models';
import { IInput } from '../input/input.model';

@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
})
export class FormElementsComponent {
  _config: IFormElements = ConfigDefault();

  @Input()
  set config(config: Partial<IFormElements>) {
    this._config = Object.assign(this._config, config);
  }

  get config(): IFormElements {
    return this._config;
  }

  @Input() formControl: UntypedFormControl;

  @Input() value = undefined;

  getValue(config: IFormElements): string {
    const { value } = config || {};
    return value ?? '-';
  }

  itemsConfig(data): Partial<IInput> {
    const { formCellType } = data;
    const dataTmp: Partial<IInput> = data;
    switch (formCellType) {
      case 'input':
        dataTmp.type = 'text';
        break;
      case 'input-number':
        dataTmp.type = 'number';
        break;
      default:
        break;
    }
    return dataTmp;
  }
}
