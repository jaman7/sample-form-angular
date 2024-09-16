import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { ActionLanguageChange, LanguageActionTypes } from './language.actions';

@Injectable()
export class LanguageEffects {
  constructor(
    private actions$: Actions<ActionLanguageChange>,
    private localStorageService: LocalStorageService
  ) {}

  changeLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LanguageActionTypes.CHANGE_LANGUAGE),
        map(action => {
          this.localStorageService.setItem('LANGUAGE', action.payload);
        })
      ),
    { dispatch: false }
  );
}
