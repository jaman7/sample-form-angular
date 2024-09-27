import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class TranslateResolver {
  constructor(private languageService: LanguageService) {}

  private extractTranslatePartials(route: ActivatedRouteSnapshot): string[] {
    const i18n = route.data.i18Local || [];
    return Array.isArray(i18n) ? i18n : [i18n];
  }

  resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    const i18nPartials = this.extractTranslatePartials(route);
    return this.languageService.loadPartials(i18nPartials);
  }
}
