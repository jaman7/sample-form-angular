import { Component, Input } from '@angular/core';
import { UntypedFormControl, ValidationErrors } from '@angular/forms';
import { ValidationEnum } from '@app/shared/enums/validation';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
})
export class ValidatorComponent {
  @Input() control: UntypedFormControl;

  value: number | string | any = '';

  message(errors: ValidationErrors | null): string {
    if (!errors) return '';

    const errorKey = Object.keys(errors)?.[0];
    if (!errorKey) return '';

    this.value = this.getErrorValue(errorKey, errors[errorKey]);

    return ValidationEnum[errorKey.toUpperCase()] ?? '';
  }

  private getErrorValue(errorKey: string, error: any): any {
    const valueMap: Record<string, any> = {
      minlength: error.requiredLength,
      maxlength: error.requiredLength,
      min: error.min,
      max: error.max,
    };

    return valueMap[errorKey] ?? '';
  }
}
