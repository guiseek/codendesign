import { readFile, readdir, writeFile, statSync } from 'fs';
import { resolve, join } from 'path';

const log = (err: Error) => console.log(err);

export const isFile = (f: string) => statSync(f).isFile();

export const write = (fName: string, str: string) =>
  new Promise((res, rej) => {
    writeFile(resolve(fName), str, (err: Error) => {
      if (err) return rej(err);

      return res(str);
    });
  });

export const readFolder = (folder: string) =>
  new Promise((res, rej) => {
    readdir(resolve(folder), (err, files) => {
      if (err) rej(err);

      const fileList = files.map((f) => join(folder, f));
      res(fileList.filter(isFile));
    });
  });

export const read = (fName: string) =>
  new Promise((res, rej) => {
    readFile(resolve(fName), (err, str) => {
      if (err) rej(err);

      res(str);
    });
  });

export const joinFiles = (files: string[]) =>
  new Promise((res, rej) => {
    return Promise.all(files.map(read))
      .then((src) => res(src.join('\n')))
      .catch(rej);
  });

export const concat = (folder: string[] | string, outFile?: string) =>
  new Promise((res, rej) => {
    let concatenated;

    if (typeof folder === 'string') {
      concatenated = readFolder(folder).then(joinFiles);
    } else {
      concatenated = joinFiles(folder);
    }

    if (outFile) {
      concatenated
        .then((out: string) => write(outFile, out).then(res).catch(rej))
        .catch(rej);
    } else {
      concatenated.then(res).catch(rej);
    }
  });
