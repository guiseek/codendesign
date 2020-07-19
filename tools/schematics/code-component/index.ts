import { ComponentSchema, defaultSchema } from './schema';
import {
  chain,
  externalSchematic,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
  hasNgModuleImport,
} from '@angular/cdk/schematics';
import { Schema } from '@schematics/angular/component/schema';
import { join } from 'path';

// interface Demo {
//   name: string;
//   path: string;
//   flat: boolean;
// }

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
function demoPath(demo: 'playground' | 'storybook', name: string) {
  return join('libs', 'demo', demo, 'src', 'lib', name);
}

function getModule({ name, project }: ComponentSchema) {
  return { name, project };
}

function component({ name, ...options }: ComponentSchema) {
  return {
    ...options,
    name,
    exports: true,
    module: `${name}/${name}.module.ts`,
  };
}

// function playground(name: string): Demo {
//   return { name, flat: true, path: demoPath('playground', name) };
// }

// function storybook(name: string) {
//   return { name, flat: true, path: demoPath('storybook', name) };
// }

function scully(name: string): Doc {
  return { name, target: 'docs' };
}

function mergeSchema(schema: ComponentSchema) {
  return { ...defaultSchema, ...schema };
}

function createModule(options: Partial<ComponentSchema>): Rule {
  return externalSchematic('@schematics/angular', 'module', options);
}

function createComponent(options: ComponentSchema): Rule {
  return externalSchematic('@ngneat/spectator', 'spectator-component', options);
}

// function createPlayground(options: Demo) {
//   return externalSchematic('angular-playground', 'sandbox', options);
// }

// function createStorybook(options: Demo) {
//   return buildComponent(options, {
//     template:
//       './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.stories.ts.template',
//   });
// }

function createScully(options: Doc) {
  return externalSchematic('@scullyio/init', 'post', options);
}
export function codeComponent(options: Schema): Rule {
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
  ]);
}

export default function (schema: ComponentSchema): Rule {
  const options = mergeSchema(schema);

  const schematics = [
    // createModule(getModule(options)),
    codeComponent(options),
    // createComponent(component(options)),
  ];
  // if (options.sandbox) {
  //   schematics.push(createPlayground(playground(options.name)));
  // }
  // if (options.story) {
  //   schematics.push(createStorybook(storybook(options.name)));
  // }
  if (options.doc) {
    schematics.push(createScully(scully(options.name)));
  }

  return chain(schematics);
}
