import { execaTask, createTask } from '../utils/task';
import { build } from '../utils/build';

export const getConcatBuild = (dist: string, output: string, name?: string) =>
  createTask('Concat', () => build(dist, output, name));

export const getBuild = (app: string, single = true) =>
  execaTask(`Build ${single ? 'single' : ''}`, 'nx', [
    'build',
    app,
    [single ? [singleParams] : []].join(' --'),
  ]);

const singleParams = [
  'buildOptimizer',
  'extractCss',
  'extractLicenses',
  'no-namedChunks',
  'optimization',
  'outputHashing=none',
  'no-sourceMap',
  'statsJson',
  'no-vendorChunk',
];
