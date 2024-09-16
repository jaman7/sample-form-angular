import { Observable, forkJoin, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as build from '../../../environments/build.json';
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
    tap(language => {
      this.translate.use(language || 'en');
      this.getPartialsTranslation([...this.initialPartials]);
    })
  );

  getPartialsTranslation(partials: string[] = []): Promise<boolean> {
    if (!partials.length) {
      return Promise.resolve(true);
    }

    return forkJoin(partials.map(partial => this.getPartial(partial)))
      .toPromise()
      .then(() => true);
  }

  private getPartial(partial: string, lang: string = this.translate.currentLang): Observable<any> {
    if (this.downloadedPartials.has(partial)) {
      return new Observable(observer => observer.complete());
    }

    this.downloadedPartials.add(partial);
    const buildTimestamp = new Date(build?.timestamp).getTime();

    return this.http.get<any>(`assets/i18Local/${lang}/${partial}.json?v=${buildTimestamp}`).pipe(
      tap(response => {
        const translations = {
          ...this.translate.translations[lang],
          ...this.translations[lang],
          ...response,
        };
        this.translations[lang] = translations;
        this.translate.setTranslation(lang, translations);
      })
    );
  }

  init(): Subscription {
    return this.setTranslateLanguage$.subscribe();
  }
}
