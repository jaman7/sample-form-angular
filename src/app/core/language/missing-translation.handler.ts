import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MissingTranslation implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    // eslint-disable-next-line prefer-destructuring
    const key = params.key.split('.')[0];
    if (['menu', 'shared'].includes(key)) {
      return '';
    }
    return params.key;
  }
}
