import {
  Schema,
  ChangeDetection,
  ViewEncapsulation,
  Style,
} from '@schematics/angular/component/schema';

export interface ComponentSchema extends Schema {
  name: string;
  style: Style;
  type?: string;
  doc?: boolean;
  story?: boolean;
  exports?: boolean;
  module?: string;
  sandbox?: boolean;
  inlineStyle?: boolean;
  inlineTemplate?: boolean;
  changeDetection?: ChangeDetection;
  viewEncapsulation?: ViewEncapsulation;
}

export const defaultSchema: ComponentSchema = {
  name: null,
  style: Style.Scss,
  prefix: 'cnd',
  doc: false,
  story: false,
  sandbox: false,
  skipImport: true,
  inlineStyle: false,
  inlineTemplate: false,
  project: 'code-components',
  changeDetection: ChangeDetection.Default,
}
