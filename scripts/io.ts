import * as fs from 'fs';
import { promisify } from 'util';

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

export const getDirectories = async (source: string): Promise<string[]> =>
    (await readdir(source, { withFileTypes: true }))
        .filter((dirent: fs.Dirent) => dirent.isDirectory())
        .map(dirent => dirent.name);

export const getFiles = async (source: string): Promise<string[]> =>
    (await readdir(source, { withFileTypes: true }))
        .filter(dirent => !dirent.isDirectory())
        .map(dirent => dirent.name);
