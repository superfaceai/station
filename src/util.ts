import { SuperJsonDocument } from '@superfaceai/ast';
import {
  detectSuperJson,
  IFileSystem,
  loadSuperJson as loadSuperJsonDocument,
  NodeFileSystem,
  normalizeSuperJsonDocument,
} from '@superfaceai/one-sdk';
import * as fs from 'fs';
import * as glob from 'glob';
import { join as joinPath, resolve } from 'path';
import { promisify } from 'util';

export const access = promisify(fs.access);
const read = promisify(fs.readFile);

export type PrintFn = (message: string) => void;

export const EXTENSIONS = {
  provider: 'json',
  profile: 'supr',
  map: 'suma',
};

let superJson: SuperJsonDocument;

export async function loadSuperJson(options?: {
  fileSystem?: IFileSystem;
}): Promise<{ document: SuperJsonDocument; path: string }> {
  const superJsonPath = await detectSuperJson(
    process.cwd(),
    options?.fileSystem ?? NodeFileSystem,
    2
  );

  if (superJsonPath === undefined) {
    throw new Error('Super.json not found');
  }

  if (!superJson) {
    const superJsonDocument = await loadSuperJsonDocument(
      joinPath(superJsonPath, 'super.json'),
      options?.fileSystem ?? NodeFileSystem
    );
    superJson = superJsonDocument.unwrap();
  }

  return { document: superJson, path: superJsonPath };
}

export async function normalizePath(
  superJsonPath: string,
  path: string
): Promise<string> {
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

export async function profilesFiles(superJson?: {
  document: SuperJsonDocument;
  path: string;
}): Promise<string[]> {
  if (superJson === undefined) {
    superJson = await loadSuperJson();
  }

  const files: string[] = [];
  const normalizedSuperJson = normalizeSuperJsonDocument(superJson.document);

  for (const profileId in normalizedSuperJson.profiles) {
    const profileSettings = normalizedSuperJson.profiles[profileId];

    if (profileSettings !== undefined && 'file' in profileSettings) {
      files.push(await normalizePath(superJson.path, profileSettings.file));
    } else {
      throw new Error(
        `${profileId} settings must be defined and lead to local file`
      );
    }
  }

  return files;
}

export async function mapsFiles(superJson?: {
  document: SuperJsonDocument;
  path: string;
}): Promise<string[]> {
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
        files.push(await normalizePath(superJson.path, map.file));
      } else {
        throw new Error(`Map ${providerId} must lead to local file`);
      }
    }
  }

  return files;
}

export async function providersFiles(superJson?: {
  document: SuperJsonDocument;
  path: string;
}): Promise<string[]> {
  if (superJson === undefined) {
    superJson = await loadSuperJson();
  }

  const files: string[] = [];
  const normalizedSuperJson = normalizeSuperJsonDocument(superJson.document);

  for (const provider in normalizedSuperJson.providers) {
    const providerSettings = normalizedSuperJson.providers[provider];

    if (providerSettings !== undefined && !!providerSettings.file) {
      files.push(await normalizePath(superJson.path, providerSettings.file));
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

  return Promise.all(
    glob
      .sync('../providers/*.json', { cwd })
      .map(async i => await normalizePath(cwd, i))
  );
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

  return Promise.all(
    glob
      .sync('../grid/**/*.supr', { cwd })
      .map(async i => await normalizePath(cwd, i))
  );
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

  return Promise.all(
    glob
      .sync('../grid/**/*.suma', { cwd })
      .map(async i => await normalizePath(cwd, i))
  );
}

export function arrayDiff<T>(a: T[], b: T[]): T[] {
  return a.filter(x => !b.includes(x));
}
