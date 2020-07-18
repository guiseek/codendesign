import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, HostBinding } from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkFooterCell,
  CdkFooterCellDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';

@Directive({
  selector: '[cndCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: CodeCellDef }],
})
export class CodeCellDef extends CdkCellDef {}

/**
 * Header cell definition for the cnd-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[cndHeaderCellDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: CodeHeaderCellDef }],
})
export class CodeHeaderCellDef extends CdkHeaderCellDef {}

/**
 * Footer cell definition for the cnd-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[cndFooterCellDef]',
  providers: [{ provide: CdkFooterCellDef, useExisting: CodeFooterCellDef }],
})
export class CodeFooterCellDef extends CdkFooterCellDef {}

/**
 * Column definition for the cnd-table.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[cndColumnDef]',
  providers: [
    { provide: CdkColumnDef, useExisting: CodeColumnDef },
    { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: CodeColumnDef },
  ],
})
export class CodeColumnDef extends CdkColumnDef {
  static ngAcceptInputType_sticky: BooleanInput;

  /** Unique name for this column. */
  @Input('cndColumnDef') name: string;

  @Input() sticky: boolean;
}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'cnd-header-cell, th[cnd-header-cell]',
})
export class CodeHeaderCell extends CdkHeaderCell {
  @HostBinding('class') class = 'cnd-header-cell';
  @HostBinding('attr.role') role = 'columnheader';
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      `cnd-column-${columnDef.cssClassFriendlyName}`
    );
  }
}

/** Footer cell template container that adds the right classes and role. */
@Directive({
  selector: 'cnd-footer-cell, td[cnd-footer-cell]',
})
export class CodeFooterCell extends CdkFooterCell {
  @HostBinding('class') class = 'cnd-footer-cell';
  @HostBinding('attr.role') role = 'gridcell';
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      `cnd-column-${columnDef.cssClassFriendlyName}`
    );
  }
}

/** Cell template container that adds the right classes and role. */
@Directive({
  selector: 'cnd-cell, td[cnd-cell]',
})
export class CodeCell extends CdkCell {
  @HostBinding('class') class = 'cnd-cell';
  @HostBinding('attr.role') role = 'gridcell';
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      `cnd-column-${columnDef.cssClassFriendlyName}`
    );
  }
}
