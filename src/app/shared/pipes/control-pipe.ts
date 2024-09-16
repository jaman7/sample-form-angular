import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { AbstractControl, UntypedFormControl } from '@angular/forms';

@Pipe({ name: 'formControlPipe' })
export class FormControlPipe implements PipeTransform {
  @memo()
  transform(absCtrl: AbstractControl | null): UntypedFormControl {
    return absCtrl as UntypedFormControl;
  }
}
