import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from '@app/components/commons/table/table.module';
import { UniversalDialogModule } from '@app/components/commons/universal-dialog/universal-dialog.module';
import { ButtonModule } from '@app/components/commons/button/button.module';
import { FormElementsModule } from '@app/components/commons/form-elements/form-elements.module';
import { SharedModule } from '@app/shared';
import { InputModule } from '@app/components/commons/input/input.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TableEditComponent } from './table-edit/table-edit.component';

@NgModule({
  declarations: [HomeComponent, TableEditComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    TranslateModule,
    TableModule,
    UniversalDialogModule,
    ButtonModule,
    FormElementsModule,
    InputModule,
  ],
})
export class HomeModule {}
