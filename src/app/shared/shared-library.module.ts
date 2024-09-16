import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
import { FormControlPipe } from './pipes/control-pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, MaterialModule],
  declarations: [FormControlPipe],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, MaterialModule, FormControlPipe],
})
export class SharedLibraryModule {}
