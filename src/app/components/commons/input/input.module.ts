import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [SharedModule],
})
export class InputModule {}
