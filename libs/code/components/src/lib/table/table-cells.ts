import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input } from '@angular/core';
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
  inputs: ['sticky'],
  providers: [
    { provide: CdkColumnDef, useExisting: CodeColumnDef },
    { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: CodeColumnDef },
  ],
})
export class CodeColumnDef extends CdkColumnDef {
  /** Unique name for this column. */
  @Input('cndColumnDef') name: string;

  static ngAcceptInputType_sticky: BooleanInput;
}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'cnd-header-cell, th[cnd-header-cell]',
  host: {
    class: 'cnd-header-cell',
    role: 'columnheader',
  },
})
export class CodeHeaderCell extends CdkHeaderCell {
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
  host: {
    class: 'cnd-footer-cell',
    role: 'gridcell',
  },
})
export class CodeFooterCell extends CdkFooterCell {
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
  host: {
    class: 'cnd-cell',
    role: 'gridcell',
  },
})
export class CodeCell extends CdkCell {
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(
      `cnd-column-${columnDef.cssClassFriendlyName}`
    );
  }
}
