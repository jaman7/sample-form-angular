import { Language } from '@app/shared/enums/language';
import { LanguageActions, LanguageActionTypes } from './language.actions';

export const languageFeatureKey = 'language';
export const initialState: Language = 'en';

// eslint-disable-next-line @typescript-eslint/default-param-last
export function languageReducer(state: Language = initialState, action: LanguageActions): Language {
  switch (action.type) {
    case LanguageActionTypes.CHANGE_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
}
