import { takeUntil } from 'rxjs/operators';
import { CodeTableColumns, CodeRowClicked } from './table.types';
import {
  Component,
  AfterViewInit,
  AfterContentInit,
  OnDestroy,
  HostBinding,
  ContentChildren,
  QueryList,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { CodeTableDataSource } from './table-data-source';
import {
  CdkHeaderRowDef,
  CdkRowDef,
  CdkColumnDef,
  CdkTable,
} from '@angular/cdk/table';
import { Subject } from 'rxjs';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';

@Component({
  selector: 'cnd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CodeTableComponent<T>
  implements AfterContentInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>();

  @HostBinding('class.cnd-table') cndTableClass = true;

  @ContentChildren(CdkHeaderRowDef) headerRowDefs: QueryList<CdkHeaderRowDef>;
  @ContentChildren(CdkRowDef) rowDefs: QueryList<CdkRowDef<T>>;
  @ContentChildren(CdkColumnDef) columnDefs: QueryList<CdkColumnDef>;

  @ViewChild(CdkTable, { static: true }) table: CdkTable<T>;

  @Input() columns: CodeTableColumns<T> = [];

  selection: SelectionModel<T> = new SelectionModel(true, []);
  @Output() selectionChange = new EventEmitter<SelectionChange<T>>();

  @Output() rowClick = new EventEmitter<CodeRowClicked<T>>();

  @Input() dataSource: CodeTableDataSource<T>;


  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach((rowDef) => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach((headerRowDef) =>
      this.table.addHeaderRowDef(headerRowDef)
    );
  }

  ngAfterViewInit() {
    if (this.columns.some((c) => c === 'select')) {
      this.selection.changed
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => this.selectionChange.emit(value));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isAllSelected() {
    const numSelected = (this.selection && this.selection.selected.length) || 0;
    const numRows = (this.dataSource && this.dataSource.data.length) || 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
}
