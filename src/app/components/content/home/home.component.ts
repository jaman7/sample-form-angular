import { Component, ComponentRef, inject, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { setColumnsConfig } from '@app/shared/utils/colums';
import { IRowSelected, ITableColumn } from '@app/components/commons/table/table.models';
import { MatDialog } from '@angular/material/dialog';
import { UniversalDialogComponent } from '@app/components/commons/universal-dialog/universal-dialog.component';
import { HttpClient } from '@angular/common/http';
import { DocOpenTypes } from '@app/shared/types/doc-types';
import { IModal } from '@app/components/commons/universal-dialog/universal-dialog.models';
import { OpenDocTypeEnum } from '@app/shared/enums';
import { TableButtonsOpenType } from '@app/components/commons/table/table.enums';
import { getMaxIdByKey, removeById } from '@app/shared/utils/arrays-utils';
import { IHomeData } from './home.model';
import { HomeService } from './home.service';
import { TableEditComponent } from './table-edit/table-edit.component';

const { ADD } = OpenDocTypeEnum;
const { DELETE } = TableButtonsOpenType;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends HomeService implements OnDestroy {
  @ViewChild('dialogContent', { static: true }) dialogContent!: TemplateRef<any>;

  #route: ActivatedRoute = inject(ActivatedRoute);

  data: IHomeData[] = this.#route.snapshot.data.homeData.map((el, i) => ({ id: i + 1, ...el }));

  columns$: Observable<ITableColumn[]> = of(setColumnsConfig(this.columnConfig));

  modal: IModal = {
    type: undefined,
    id: undefined,
  };

  constructor(
    public dialog: MatDialog,
    public httpClient: HttpClient
  ) {
    super(httpClient);
  }

  ngOnDestroy(): void {
    this.data = [];
  }

  onDocAction(event: IRowSelected): void {
    const { id, openType, row } = event;
    if (openType === DELETE) {
      this.onClickDelete(id);
    } else if (openType) {
      this.modal = {
        type: openType as DocOpenTypes,
      };

      this.openDialog(this.modal, openType === ADD ? {} : row);
    }
  }

  onClickAdd(): void {
    this.modal = {
      type: ADD,
    };
    this.openDialog(this.modal, {});
  }

  updateTableRow(row: IHomeData): void {
    const { id } = row || {};
    if (id) {
      this.data = this.data.map(el => (el.id === row.id ? row : el));
    } else {
      this.data = [...this.data, { ...row, id: getMaxIdByKey(this.data) }];
    }
  }

  onClickDelete(id: number): void {
    this.data = removeById(this.data, id);
  }

  openDialog(modal: IModal, row): void {
    const { type } = modal || {};
    const dialogRef = this.dialog.open(UniversalDialogComponent, {
      width: '500px',
      data: { title: `modal.${type.toLowerCase()}` },
    });

    dialogRef.afterOpened().subscribe(() => {
      const { viewContainerRef } = dialogRef.componentInstance;
      const componentRef: ComponentRef<TableEditComponent> = viewContainerRef.createComponent(TableEditComponent);
      componentRef.instance.data = { rowData: row, modal: this.modal };

      componentRef.instance.closeModal.subscribe((data: IHomeData) => {
        dialogRef.close();
        this.updateTableRow(data);
      });
    });
  }
}
