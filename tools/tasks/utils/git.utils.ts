import * as execa from 'execa';
import { curry, set, view } from 'ramda';

const git = async (args: string[], options = {}) => {
  const { stdout } = await execa('git', args, options);
  return stdout;
};

/**
 * @async
 * @param hash Git commit hash.
 * @return {Promise<Array>} Arquivos modificados no commit.
 * https://stackoverflow.com/questions/424071/how-to-list-all-the-files-in-a-commit
 */
const getCommitFiles = async (hash: string): Promise<string[]> => {
  return (
    await git(['diff-tree', '--no-commit-id', '--name-only', '-r', hash])
  ).split('\n');
};

/**
 * @async
 * @returns {Promise<string>} caminho do repositório
 * https://stackoverflow.com/a/957978/89594
 */
const getRoot = (): Promise<string> => git(['rev-parse', '--show-toplevel']);

/**
 * Async version of Ramda's `over` lens utility.
 */
const overA = curry(async (lens, f, x) => {
  const value = await f(view(lens, x));
  return set(lens, value, x);
});

export { getCommitFiles, getRoot, overA };
