import * as execa from 'execa';

const affectedTest = {
  title: 'Testes',
  task: async () => await execa('nx', ['affected:test']),
};

const affectedLibs = {
  title: 'Bibliotecas',
  task: async () => await execa('nx', ['affected:libs']),
};

const affectedApps = {
  title: 'Aplicações',
  task: async () => await execa('nx', ['affected:apps']),
};

export { affectedTest, affectedLibs, affectedApps };
