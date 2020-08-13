import * as Listr from 'listr';
import { execaTask } from '../utils/task';

export const getGitStatus = execaTask('Status', 'git', [
  'status',
  '--porcelain',
]);
export const getGitRevList = execaTask('RevList', 'git', [
  'rev-list',
  '--count',
  '--left-only',
  '@{u}...HEAD',
]);


export const getGitTasks = new Listr(
  [getGitStatus, getGitRevList],
  { concurrent: false }
);

export default {
  title: 'Git',
  task: () => getGitTasks
};

// export const gitStatus = () => ({
//   title: 'Status',
//   task: () =>
//     execa('git', ['status', '--porcelain']).then(({ stdout }) => {
//       if (stdout !== '') {
//         throw new Error('Confirme ou armazene suas alterações primeiro.');
//       }
//     }),
// });

// export const gitRevList = () => ({
//   title: 'Rev List',
//   task: () =>
//     execa('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']).then(
//       ({ stdout }) => {
//         if (stdout !== '0') {
//           throw new Error(
//             'Histórico local diferente do remoto, faça o pull primeiro.'
//           );
//         }
//       }
//     ),
// });
