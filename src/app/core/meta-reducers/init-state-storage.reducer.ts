/* eslint-disable import/no-cycle */
import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { toCamelCase } from '@app/shared/utils/string-utils';
import { AppState } from '../core.state';
import { APP_PREFIX } from '../local-storage/local-storage.service';

export function getStateKeys(storageKey: string): string[] {
  return storageKey.replace(APP_PREFIX, '').toLowerCase().split('.').map(toCamelCase);
}

function safelyParseJSON(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

function updateNestedState(state: any, keys: string[], value: any): any {
  return keys.reduceRight((acc, key, index) => {
    if (index === keys.length - 1) {
      return { ...state, [key]: value };
    }
    return { ...state, [key]: { ...state[key], ...acc } };
  }, {});
}

export function loadInitialState(): Record<string, any> {
  return Object.keys(sessionStorage).reduce((state: any, storageKey: string) => {
    if (!storageKey.startsWith(APP_PREFIX)) {
      return state;
    }

    const storedItem = sessionStorage.getItem(storageKey);
    if (!storedItem) return state;

    const parsedItem = safelyParseJSON(storedItem);
    if (parsedItem === null) return state;

    const stateKeys = getStateKeys(storageKey);
    return updateNestedState(state, stateKeys, parsedItem);
  }, {});
}

export function initStateFromLocalStorage(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const newState = reducer(state, action);

    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      const loadedState = loadInitialState();
      return { ...newState, ...loadedState };
    }

    return newState;
  };
}

export function debugReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => reducer(state, action);
}
