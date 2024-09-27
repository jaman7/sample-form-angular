import { Observable, forkJoin, Subscription, of, lastValueFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import build from '../../../environments/build.json';
import { AppState, selectLanguageState } from '../core.state';

@Injectable()
export class LanguageService {
  private translations: { [key: string]: any } = {};

  private downloadedPartials = new Set<string>();

  private initialPartials = new Set<string>();

  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
    private http: HttpClient
  ) {}

  setTranslateLanguage$: Observable<string> = this.store.pipe(
    select(selectLanguageState),
    distinctUntilChanged(),
    filter(Boolean),
    tap(language => {
      this.translate.use(language || 'en');
      this.loadPartials([...this.initialPartials]);
    })
  );

  loadPartials(partials: string[] = []): Promise<boolean> {
    if (!partials.length) {
      return Promise.resolve(true);
    }

    return lastValueFrom(
      forkJoin(partials.map(partial => this.fetchPartial(partial))).pipe(
        map(() => true),
        catchError(() => of(true))
      )
    );
  }

  private fetchPartial<T>(partial: string, lang: string = this.translate.currentLang): Observable<T> {
    if (this.downloadedPartials.has(partial)) {
      return of(null);
    }

    this.downloadedPartials.add(partial);
    const buildTimestamp = new Date(build.timestamp).getTime();

    return this.http.get<any>(`assets/i18Local/${lang}/${partial}.json?v=${buildTimestamp}`).pipe(
      tap(response => {
        const translations = {
          ...this.translate.translations[lang],
          ...this.translations[lang],
          ...response,
        };
        this.translations[lang] = translations;
        this.translate.setTranslation(lang, translations);
      }),
      catchError(error => {
        console.error(`Failed to load partial ${partial}:`, error);
        return of(null);
      })
    );
  }

  init(): Subscription {
    return this.setTranslateLanguage$.subscribe();
  }
}
