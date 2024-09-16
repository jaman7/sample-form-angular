import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSortModule } from '@angular/material/sort';
// import { MatInputModule } from '@angular/material/input';
import { TableComponent } from './table.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, SharedModule, ButtonModule],
  exports: [TableComponent],
})
export class TableModule {}
