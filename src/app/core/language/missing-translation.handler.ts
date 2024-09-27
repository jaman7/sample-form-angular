import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MissingTranslation implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    const [key] = params.key.split('.');
    return key === 'default' ? '' : params.key;
  }
}
