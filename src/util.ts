import { SuperJsonDocument } from '@superfaceai/ast';
import {
  detectSuperJson,
  IFileSystem,
  loadSuperJson as loadSuperJsonDocument,
  NodeFileSystem,
  normalizeSuperJsonDocument,
} from '@superfaceai/one-sdk';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as glob from 'glob';
import { join as joinPath, resolve } from 'path';
import { promisify } from 'util';

export type PrintFn = (message: string) => void;
export interface SuperJsonWithPath {
  document: SuperJsonDocument;
  path: string;
}

export const access = promisify(fs.access);
const read = promisify(fs.readFile);

export const EXTENSIONS = {
  provider: 'json',
  profile: 'supr',
  map: 'suma',
};

let superJson: SuperJsonWithPath;

export async function loadSuperJson(options?: {
  fileSystem?: IFileSystem;
}): Promise<SuperJsonWithPath> {
  if (superJson !== undefined) {
    return superJson;
  }

  const superJsonPath = await detectSuperJson(
    process.cwd(),
    options?.fileSystem ?? NodeFileSystem,
    2
  );

  if (superJsonPath === undefined) {
    throw new Error('Super.json not found');
  }

  const superJsonDocument = await loadSuperJsonDocument(
    joinPath(superJsonPath, 'super.json'),
    options?.fileSystem ?? NodeFileSystem
  );

  superJson = {
    document: superJsonDocument.unwrap(),
    path: superJsonPath,
  };

  return superJson;
}

export function normalizePath(superJsonPath: string, path: string): string {
  return resolve(superJsonPath, path);
}

export async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }

  return true;
}

export async function readFile(path: string): Promise<string> {
  return await read(path, { encoding: 'utf8' });
}

export async function profilesFiles(
  superJson?: SuperJsonWithPath
): Promise<string[]> {
  if (superJson === undefined) {
    superJson = await loadSuperJson();
  }

  const files: string[] = [];
  const normalizedSuperJson = normalizeSuperJsonDocument(superJson.document);

  for (const profileId in normalizedSuperJson.profiles) {
    const profileSettings = normalizedSuperJson.profiles[profileId];

    if (profileSettings !== undefined && 'file' in profileSettings) {
      files.push(normalizePath(superJson.path, profileSettings.file));
    } else {
      throw new Error(
        `${profileId} settings must be defined and lead to local file`
      );
    }
  }

  return files;
}

export async function mapsFiles(
  superJson?: SuperJsonWithPath
): Promise<string[]> {
  if (superJson === undefined) {
    superJson = await loadSuperJson();
  }

  const files: string[] = [];
  const normalizedSuperJson = normalizeSuperJsonDocument(superJson.document);

  for (const profileId in normalizedSuperJson.profiles) {
    const profileSettings = normalizedSuperJson.profiles[profileId];

    for (const providerId in profileSettings.providers) {
      const map = profileSettings.providers[providerId];

      if (map !== undefined && 'file' in map) {
        files.push(normalizePath(superJson.path, map.file));
      } else {
        throw new Error(`Map ${providerId} must lead to local file`);
      }
    }
  }

  return files;
}

export async function providersFiles(
  superJson?: SuperJsonWithPath
): Promise<string[]> {
  if (superJson === undefined) {
    superJson = await loadSuperJson();
  }

  const files: string[] = [];
  const normalizedSuperJson = normalizeSuperJsonDocument(superJson.document);

  for (const provider in normalizedSuperJson.providers) {
    const providerSettings = normalizedSuperJson.providers[provider];

    if (providerSettings !== undefined && !!providerSettings.file) {
      files.push(normalizePath(superJson.path, providerSettings.file));
    } else {
      throw new Error(
        `${provider} settings must be defined and lead to local file`
      );
    }
  }

  return files;
}

export async function localProviders(options?: {
  fileSystem?: IFileSystem;
}): Promise<string[]> {
  const cwd = await detectSuperJson(
    process.cwd(),
    options?.fileSystem ?? NodeFileSystem
  );

  if (cwd === undefined) {
    throw new Error('Super.json not found');
  }

  return glob
    .sync('../providers/*.json', { cwd })
    .map(i => normalizePath(cwd, i));
}

export async function localProfiles(options?: {
  fileSystem?: IFileSystem;
}): Promise<string[]> {
  const cwd = await detectSuperJson(
    process.cwd(),
    options?.fileSystem ?? NodeFileSystem
  );

  if (cwd === undefined) {
    throw new Error('Super.json not found');
  }

  return glob
    .sync('../grid/**/*.supr', { cwd })
    .map(i => normalizePath(cwd, i));
}

export async function localMaps(options?: {
  fileSystem?: IFileSystem;
}): Promise<string[]> {
  const cwd = await detectSuperJson(
    process.cwd(),
    options?.fileSystem ?? NodeFileSystem
  );

  if (cwd === undefined) {
    throw new Error('Super.json not found');
  }

  return glob
    .sync('../grid/**/*.suma', { cwd })
    .map(i => normalizePath(cwd, i));
}

export function arrayDiff<T>(a: T[], b: T[]): T[] {
  return a.filter(x => !b.includes(x));
}

export async function gitDiff(
  commit1: string,
  commit2: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    exec(
      `git diff --name-status ${commit1}..${commit2}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(error.message));
        }
        if (stderr) {
          reject(new Error('StdErr: ' + stderr));
        }

        const regexpFile = /^[A,M]\s*(.*)$/;
        const lines = stdout.split('\n');
        const files = lines
          .map(line => {
            const match = regexpFile.exec(line);

            return match && match.length > 1 ? match[1] : undefined;
          })
          .filter(file => file !== undefined) as string[];

        resolve(files);
      }
    );
  });
}
