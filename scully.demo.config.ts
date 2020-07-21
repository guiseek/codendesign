import { ScullyConfig } from '@scullyio/scully';
import { PluginScullyHighlight } from './dist/libs/plugin/scully-highlight';

export const config: ScullyConfig = {
  projectRoot: './apps/demo/src',
  projectName: 'demo',
  defaultPostRenderers: [PluginScullyHighlight],
  outDir: './dist/static',
  routes: {
    '/docs/:selector': {
      type: 'contentFolder',
      selector: {
        folder: './docs/components',
      },
    },
  },
};
