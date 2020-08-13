import * as Listr from 'listr';
import { affectedTest, affectedLibs, affectedApps } from './nx-affected';
import { execaTask } from '../utils/task';

export const getAffectedTest = execaTask('Testes', 'nx', ['affected:test']);
export const getAffectedLibs = execaTask('Libs', 'nx', ['affected:libs']);
export const getAffectedApps = execaTask('Apps', 'nx', ['affected:apps']);
export const getAffectedTasks = new Listr(
  [affectedTest, affectedLibs, affectedApps],
  { concurrent: false }
);

export default {
  title: 'Afetados',
  task: () => getAffectedTasks
};
