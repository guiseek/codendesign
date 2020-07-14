import { ComponentSchema, defaultSchema } from './schema';
import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { join } from 'path';
import { buildComponent } from '@angular/cdk/schematics';

interface Demo {
  name: string;
  path: string;
  flat: boolean;
}

interface Doc {
  name: string;
  target: string;
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

function playground(name: string): Demo {
  return { name, flat: true, path: demoPath('playground', name) };
}

function storybook(name: string) {
  return { name, flat: true, path: demoPath('storybook', name) };
}

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

function createPlayground(options: Demo) {
  return externalSchematic('angular-playground', 'sandbox', options);
}

function createStorybook(options: Demo) {
  return buildComponent(options, {
    template:
      './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.stories.ts.template',
  });
}

function createScully(options: Doc) {
  return externalSchematic('@scullyio/init', 'post', options);
}

export default function (schema: ComponentSchema): Rule {
  const options = mergeSchema(schema);

  const schematics = [
    createModule(getModule(options)),
    createComponent(component(options)),
  ];
  if (options.sandbox) {
    schematics.push(createPlayground(playground(options.name)));
  }
  if (options.story) {
    schematics.push(createStorybook(storybook(options.name)));
  }
  if (options.doc) {
    schematics.push(createScully(scully(options.name)));
  }

  return chain(schematics);
}
