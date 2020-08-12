import yargs from 'yargs';
import * as execa from 'execa';
import * as Listr from 'listr';

const tasks = new Listr(
  [
    {
      title: 'Git',
      task: () =>
        execa('git', ['status', '--porcelain']).then(({ stdout }) => {
          if (stdout !== '') {
            throw new Error('Confirme ou armazene suas alterações primeiro.');
          }
        }),
    },
    {
      title: 'Checking remote history',
      task: () =>
        execa('git', [
          'rev-list',
          '--count',
          '--left-only',
          '@{u}...HEAD',
        ]).then(({ stdout }) => {
          if (stdout !== '0') {
            throw new Error(
              'Histórico local diferente do remoto, faça o pull primeiro.'
            );
          }
        }),
    },
  ],
  { concurrent: true }
);

tasks.run().catch(({ message }) => console.error);
