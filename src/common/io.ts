import * as fs from 'fs';
import { promisify } from 'util';

export const rm = promisify(fs.rm);
export const readdir = promisify(fs.readdir);
export const copyFile = promisify(fs.copyFile);
export const access = promisify(fs.access);
export const mkdir = promisify(fs.mkdir);
const read = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);

export async function readFile(path: string): Promise<string> {
  const data = await read(path);
  if (Buffer.isBuffer(data)) {
    return data.toString('utf8');
  } else {
    return data;
  }
}
export async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }

  return true;
}

/**
 * Creates a directory without erroring if it already exists.
 * Returns `true` if the directory was created.
 */
export async function mkdirQuiet(path: string): Promise<boolean> {
  try {
    await mkdir(path);
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'code' in err) {
      // Allow `EEXIST` because scope directory already exists.
      const ioErr = err as { code: string };
      if (ioErr.code === 'EEXIST') {
        return false;
      }
    }

    // Rethrow other errors.
    throw err;
  }

  return true;
}

export const getDirectories = async (source: string): Promise<string[]> =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent: fs.Dirent) => dirent.isDirectory())
    .map(dirent => dirent.name);

export const getFiles = async (source: string): Promise<string[]> =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name);
