/* eslint-disable import/no-cycle */
import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { toCamelCase } from '@app/shared/utils/string-utils';
import { AppState } from '../core.state';
import { APP_PREFIX } from '../local-storage/local-storage.service';

export function getStateKeys(storageKey: string): string[] {
  return storageKey
    .replace(APP_PREFIX, '')
    .toLowerCase()
    .split('.')
    .map(key => toCamelCase(key));
}

export function loadInitialState(): any {
  return Object.keys(sessionStorage).reduce((state: any, storageKey: string) => {
    let stateTmp = state;

    if (!storageKey.includes(APP_PREFIX)) {
      return stateTmp;
    }

    const stateKeys = getStateKeys(storageKey);
    stateKeys.forEach((key, index) => {
      if (index === stateKeys.length - 1) {
        const storedItem = sessionStorage.getItem(storageKey);
        // Only parse if the storedItem is not null
        stateTmp[key] = storedItem ? JSON.parse(storedItem) : null;
        return stateTmp;
      }
      stateTmp[key] = stateTmp[key] || {};
      stateTmp = stateTmp[key];
      return false;
    });

    return state;
  }, {});
}

export function initStateFromSessionStorage(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      const loadedState = loadInitialState();
      return { ...newState, ...loadedState };
    }
    return newState;
  };
}
