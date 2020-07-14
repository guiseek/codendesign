import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./apps/demo/src",
  projectName: "demo",
  outDir: './dist/static',
  routes: {
    '/docs/:selector': {
      type: 'contentFolder',
      selector: {
        folder: "./docs"
      }
    },}
};
