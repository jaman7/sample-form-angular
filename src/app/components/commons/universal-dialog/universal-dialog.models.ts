import { DocOpenTypes } from '@app/shared/types/doc-types';

export interface IModal {
  header?: string;
  type?: DocOpenTypes | undefined;
  id?: number;
}

export enum IModalButtons {
  CLOSE = 'CLOSE',
}

export type ButtonsTypes = 'CLOSE';
