import { Language } from '@app/shared/enums/language';
import { Action } from '@ngrx/store';

export enum LanguageActionTypes {
  CHANGE_LANGUAGE = '[Language] Change Language',
}

export class ActionLanguageChange implements Action {
  readonly type = LanguageActionTypes.CHANGE_LANGUAGE;

  constructor(public payload: Language) {}
}

export type LanguageActions = ActionLanguageChange;
