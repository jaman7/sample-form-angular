import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ifChanged } from '@app/shared/utils/changes-utils';
import { IButton } from '../button/button.model';
import { TableButtons, TableButtonsOpenType } from './table.enums';
import { IRowSelected, ITableColumn, OperationButtonTypes } from './table.models';
import { ActionColumnDef } from './table.constans';

const { SHOW, EDIT, DELETE } = TableButtons;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent<T> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() rows: T[] = [];

  @Input() buttonKeys: any[] = [SHOW, EDIT, DELETE];

  @Input() showControls = false;

  @Input() showGlobalFilter = false;

  @Input() placeholderFilter = 'search';

  @Input() showAddButton = false;

  @Input()
  set columns(value: ITableColumn[]) {
    if (!this._columnsAreEqual(value)) {
      this._columns = [
        ...value,
        {
          ...ActionColumnDef,
          id: value.length + 1,
        },
      ];
      this.displayedColumns = this._columns.map(column => column.field);
    }
  }

  @Output() buttonEvent = new EventEmitter<IRowSelected>();

  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<T>([]);

  private filterSubject = new Subject<string>();

  private filterSubscription!: Subscription;

  _columns: ITableColumn[] = [];

  displayedColumns: string[] = [];

  buttonConfig: IButton[] = [];

  actionColumnDef = ActionColumnDef;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.rows);
    this.buttonConfig = this.setButtonConfig(this.buttonKeys);

    this.filterSubscription = this.filterSubject
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(filterValue => this.applyFilter(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { rows } = changes;
    ifChanged(rows, () => {
      this.dataSource = new MatTableDataSource(this.rows);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  setButtonConfig(keys: OperationButtonTypes[]): IButton[] {
    return keys.map(key => ({
      id: key,
      icon: key === (SHOW as string) ? 'visibility' : key,
      isRound: true,
      className: 'table-btn',
      tooltipTitle: `common.table.tooltip.${key}`,
    }));
  }

  onClick(buttonId: OperationButtonTypes, row: any): void {
    const type = TableButtonsOpenType[buttonId.toUpperCase() as keyof typeof TableButtonsOpenType];
    this.buttonEvent.emit({ openType: type, id: row.id, row });
  }

  onClickAdd(buttonId: OperationButtonTypes): void {
    const type = TableButtonsOpenType[buttonId.toUpperCase() as keyof typeof TableButtonsOpenType];
    this.buttonEvent.emit({ openType: type });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onFilterChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  private _columnsAreEqual(newColumns: ITableColumn[]): boolean {
    return JSON.stringify(newColumns) === JSON.stringify(this._columns);
  }
}
