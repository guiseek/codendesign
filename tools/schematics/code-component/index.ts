import { ComponentSchema, defaultSchema } from './schema';
import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
// import { buildComponent } from '@angular/cdk/schematics';

function mergeSchema(schema: ComponentSchema) {
  return { ...defaultSchema, ...schema };
}

function createModule({ name, project }: ComponentSchema): Rule {
  return externalSchematic('@schematics/angular', 'module', {
    project,
    name,
  });
}

function createComponent(options: ComponentSchema): Rule {
  let module = options.name;
  module = `${module}/${module}.module.ts`;
  return externalSchematic('@schematics/angular', 'component', {
    ...options,
    module,
  });
}

export default function (schema: ComponentSchema): Rule {
  const options = mergeSchema(schema);
  const schematics = [
    createModule(options),
    createComponent(options)
  ];
  return chain(schematics);
}
