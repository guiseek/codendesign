import {
  Schema,
  ChangeDetection,
  ViewEncapsulation,
  Style,
} from '@schematics/angular/component/schema';
import { join } from 'path';

export interface ComponentSchema extends Schema {
  name: string;
  style: Style;
  type?: string;
  story?: boolean;
  exports?: boolean;
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
  story: false,
  exports: true,
  sandbox: false,
  inlineStyle: false,
  inlineTemplate: false,
  project: 'code-components',
  changeDetection: ChangeDetection.Default,
}

// export class Component implements ComponentSchema {
  // name = null;
  // style = Style.Scss;
  // story = false;
  // exports = true;
  // sandbox = false;
  // inlineStyle = false;
  // inlineTemplate = false;
  // changeDetection = ChangeDetection.Default;

//   prefix = 'cnd';
//   project = 'code-components';

//   constructor(options?: ComponentSchema) {
//     if (options) {
//       this.merge(options);
//     }
//   }
//   values() {
//     return {
//       name: this.name,
//       style: this.style,
//       story: this.story,
//       exports: this.exports,
//       sandbox: this.sandbox,
//       inlineStyle: this.inlineStyle,
//       inlineTemplate: this.inlineTemplate,
//       changeDetection: this.changeDetection,
//     };
//   }
//   merge({
//     name = this.name,
//     style = this.style,
//     story = this.story,
//     exports = this.exports,
//     sandbox = this.sandbox,
//     inlineStyle = this.inlineStyle,
//     inlineTemplate = this.inlineTemplate,
//     changeDetection = this.changeDetection,
//     ...options
//   }: ComponentSchema) {
//     return {
//       name,
//       style,
//       story,
//       exports,
//       sandbox,
//       inlineStyle,
//       inlineTemplate,
//       changeDetection,
//       ...options,
//     };
//   }
// }
