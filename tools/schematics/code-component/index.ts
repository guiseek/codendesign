import { ComponentSchema, defaultSchema } from './schema';
import {
  chain,
  externalSchematic,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
  hasNgModuleImport,
} from '@angular/cdk/schematics';
import { Schema } from '@schematics/angular/component/schema';

interface Doc {
  name: string;
  target: string;
}

const myModules = [
  ['BrowserAnimationsModule', '@angular/platform-browser/animations'],
];

function checkModulesToImport(host: Tree, path = ''): void {
  for (const [m, p] of myModules) {
    if (!hasNgModuleImport(host, path, m)) {
      addModuleImportToModule(host, path, m, p);
    }
  }
}

/**
 * Adds the required modules to the relative module.
 */
function addRequiredModules(options: Schema): Rule {
  return (host: Tree) => {
    if (!options.skipImport) {
      const modulePath = findModuleFromOptions(host, options);
      checkModulesToImport(host, modulePath);
    }
    return host;
  };
}

function scully(name: string): Doc {
  return { name, target: 'docs/components' };
}

function mergeSchema(schema: ComponentSchema) {
  return { ...defaultSchema, ...schema };
}

function addTsExport(filePath: string, filesToExport: string[]): Rule {
  return (host: Tree) => {
    let content = host.read(filePath) + '';

    for (const file of filesToExport) {
      content += `export * from '${file}';\n`;
    }

    host.overwrite(filePath, content);
  };
}

function createScully(options: Doc) {
  return externalSchematic('@scullyio/init', 'post', options);
}
export function codeComponent(options: Schema): Rule {
  const indexFile = 'libs/code/components/src/index.ts';
  const componentName = strings.dasherize(options.name);
  return chain([
    buildComponent(
      { ...options },
      {
        template:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html.template',
        stylesheet:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__style__.template',
      }
    ),
    addRequiredModules(options),
    addTsExport(indexFile, [`./lib/${componentName}/index`]),
  ]);
}

export default function (schema: ComponentSchema): Rule {
  const options = mergeSchema(schema);
  return chain([
    codeComponent(options),
    createScully(scully(options.name))
  ]);
}
