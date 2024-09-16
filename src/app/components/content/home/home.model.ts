import { UntypedFormControl } from '@angular/forms';

export interface IHomeData {
  id?: number;
  name: string;
  position: number;
  symbol: string;
  weight: number;
}

export interface IHomeDataForm {
  id: UntypedFormControl;
  name?: UntypedFormControl;
  position?: UntypedFormControl;
  symbol?: UntypedFormControl;
  weight?: UntypedFormControl;
}
