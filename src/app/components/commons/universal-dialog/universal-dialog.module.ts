import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { UniversalDialogComponent } from './universal-dialog.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [UniversalDialogComponent],
  imports: [SharedModule, ButtonModule],
  exports: [UniversalDialogComponent],
})
export class UniversalDialogModule {}
