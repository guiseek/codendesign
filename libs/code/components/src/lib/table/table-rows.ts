import { BooleanInput } from '@angular/cdk/coercion';
import {
  CDK_ROW_TEMPLATE,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
} from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Definição de linha de cabeçalho para a tabela cnd.
 * Captura o modelo da linha do cabeçalho e outras propriedades
 * do cabeçalho, como as colunas a serem exibidas.
 */
@Directive({
  selector: '[cndHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: CodeHeaderRowDef }],
  inputs: ['columns: cndHeaderRowDef', 'sticky: cndHeaderRowDefSticky'],
})
export class CodeHeaderRowDef extends CdkHeaderRowDef {
  static ngAcceptInputType_sticky: BooleanInput;
}

/**
 * Definição de linha de rodapé para a tabela cnd.
 * Captura o modelo da linha de rodapé e outras propriedades
 * do rodapé, como as colunas a serem exibidas.
 */
@Directive({
  selector: '[cndFooterRowDef]',
  providers: [{ provide: CdkFooterRowDef, useExisting: CodeFooterRowDef }],
  inputs: ['columns: cndFooterRowDef', 'sticky: cndFooterRowDefSticky'],
})
export class CodeFooterRowDef extends CdkFooterRowDef {
  static ngAcceptInputType_sticky: BooleanInput;
}

/**
 * Definição de linha de dados para a tabela cnd.
 * Captura o modelo da linha de dados e outras propriedades,
 * como as colunas a serem exibidas e a quando predicado
 * que descreve quando esta linha deve ser usada.
 */
@Directive({
  selector: '[cndRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: CodeRowDef }],
  inputs: ['columns: cndRowDefColumns', 'when: cndRowDefWhen'],
})
export class CodeRowDef<T> extends CdkRowDef<T> {}

/**
 * Recipiente de modelo de cabeçalho que contém a saída da célula.
 * Adiciona a classe e função corretas.
 */
@Component({
  selector: 'cnd-header-row, tr[cnd-header-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'cnd-header-row',
    role: 'row',
  },
  // Veja a nota no CdkTable para obter uma explicação sobre por que
  // isso usa a estratégia de detecção de alterações padrão.
  // tslint: disable-next-line: validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'cndHeaderRow',
  providers: [{ provide: CdkHeaderRow, useExisting: CodeHeaderRow }],
})
export class CodeHeaderRow extends CdkHeaderRow {}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'cnd-footer-row, tr[cnd-footer-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'cnd-footer-row',
    role: 'row',
  },
  // Consulte a nota no CdkTable para obter uma explicação
  // sobre por que isso usa a estratégia de detecção de alterações padrão.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'cndFooterRow',
  providers: [{ provide: CdkFooterRow, useExisting: CodeFooterRow }],
})
export class CodeFooterRow extends CdkFooterRow {}

/**
 * Contêiner de modelo de linha de dados que contém a saída da célula.
 * Adiciona a classe e função corretas.
 */
@Component({
  selector: 'cnd-row, tr[cnd-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'cnd-row',
    role: 'row',
  },
  // Consulte a nota no CdkTable para obter uma explicação sobre por que isso usa a estratégia de detecção de alterações padrão.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'cndRow',
  providers: [{ provide: CdkRow, useExisting: CodeRow }],
})
export class CodeRow extends CdkRow {}

/** Linha que pode ser usada para exibir uma mensagem quando nenhum dado é mostrado na tabela. */
// @Directive({
//   selector: 'ng-template[cndNoDataRow]',
//   providers: [{provide: CdkNoDataRow, useExisting: CodeNoDataRow}],
// })
// export class CodeNoDataRow extends CdkNoDataRow {
// }
