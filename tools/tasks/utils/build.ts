import { ensureDir, emptyDir } from 'fs-extra';
import { join } from 'path';
import { concat } from './file';

export const build = async (dist: string, output: string, name = 'web') => {
  const files = ['runtime', 'polyfills', 'main'].map((file) =>
    join(dist, `${file}-es2015.js`)
  );
  const time = Date.now();
  try {
    const bundle = `${name}.${time}.js`;
    const path = join(output, bundle);
    await ensureDir(output);
    await emptyDir(output);
    return await concat(files, path);
  } catch (error) {
    console.error(error.message);
  }
};
