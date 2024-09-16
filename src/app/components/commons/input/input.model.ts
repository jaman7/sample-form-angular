import { InputTypes } from './input.types';

export interface IInput {
  type?: InputTypes;
  placeholder?: string;
  readonly?: boolean;
  customClass?: string;
  maxLength?: number;
  min?: number;
  max?: bigint | number;
  precision?: number;
  step?: number;
  header?: string;
}

export const ConfigDefault = (): IInput => ({
  placeholder: '',
  precision: 0,
  step: 1,
  type: 'text',
});
