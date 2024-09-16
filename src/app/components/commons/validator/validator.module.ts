import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { ValidatorComponent } from './validator.component';

@NgModule({
  declarations: [ValidatorComponent],
  exports: [ValidatorComponent],
  imports: [CommonModule, MatInputModule, TranslateModule],
})
export class ValidatorModule {}
