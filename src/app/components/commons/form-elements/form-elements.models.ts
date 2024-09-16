import { IInput } from '../input/input.model';
import { InputTypes } from '../input/input.types';
import { FormElementsTypes } from './form-elements.types';

export type IFormElements = Omit<IInput, 'type'> & {
  formControlName?: string;
  minRows?: number;
  maxRows?: number;
  header?: string;
  formCellType?: FormElementsTypes;
  config?: IFormElements;
  value?: string;
  type?: FormElementsTypes | InputTypes;
  prefix?: string;
  placeholder?: string;
};

export const ConfigDefault = (): IFormElements => ({
  minRows: 2,
  maxRows: 7,
  step: 1,
  type: 'text',
});
