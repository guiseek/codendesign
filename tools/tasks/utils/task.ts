import * as execa from 'execa';
import * as Listr from 'listr';

export const execaTask = (
  title: string,
  command: string,
  params?: string[]
) => ({
  title,
  task: async () => await execa(command, params),
});

export const createTask = (title: string, task) => ({
  title,
  task: () => task,
});
export const createTasks = (
  title: string,
  tasks: Listr.ListrTask[],
  options: Listr.ListrOptions = { concurrent: false }
) => ({
  title,
  task: () => {
    return new Listr(tasks, options);
  },
});
