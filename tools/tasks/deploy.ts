import * as Listr from 'listr';
import { getBuild, getConcatBuild } from './build';

const app = 'pocs-elements';
const dist = 'dist/apps/pocs';

const tasks = new Listr([
  getBuild(app, true), getConcatBuild(dist, `${dist}/${app}`, app)], {
  concurrent: false,
  exitOnError: true,
});

tasks.run().catch(({ message }) => console.error(message));
