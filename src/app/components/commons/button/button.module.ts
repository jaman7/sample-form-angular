import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, TranslateModule, MatTooltipModule, MatIconModule, DirectivesModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
