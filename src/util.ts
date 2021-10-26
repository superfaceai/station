import { SuperJson } from '@superfaceai/one-sdk';
import * as fs from 'fs';
import * as glob from 'glob';
import { promisify } from 'util';

export const access = promisify(fs.access);
const read = promisify(fs.readFile);

export type PrintFn = (message: string) => void;

export const EXTENSIONS = {
  provider: 'json',
  profile: 'supr',
  map: 'suma',
};

let _superJson: SuperJson;

export function loadSuperJson(): SuperJson {
  if (!_superJson) {
    _superJson = SuperJson.loadSync().unwrap();
  }

  return _superJson;
}

export function normalizePath(
  path: string,
  superJson: SuperJson = loadSuperJson()
): string {
  return superJson.resolvePath(path);
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

export async function readFile(path: string): Promise<string> {
  return await read(path, { encoding: 'utf8' });
}

export function profilesFiles(
  superJson: SuperJson = loadSuperJson()
): string[] {
  const files: string[] = [];

  for (const profileId in superJson.normalized.profiles) {
    const profileSettings = superJson.normalized.profiles[profileId];

    if (profileSettings !== undefined && 'file' in profileSettings) {
      files.push(normalizePath(profileSettings.file, superJson));
    } else {
      throw new Error(
        `${profileId} settings must be defined and lead to local file`
      );
    }
  }

  return files;
}

export function mapsFiles(superJson: SuperJson = loadSuperJson()): string[] {
  const files: string[] = [];

  for (const profileId in superJson.normalized.profiles) {
    const profileSettings = superJson.normalized.profiles[profileId];

    for (const providerId in profileSettings.providers) {
      const map = profileSettings.providers[providerId];

      if (map !== undefined && 'file' in map) {
        files.push(normalizePath(map.file, superJson));
      } else {
        throw new Error(`Map ${providerId} must lead to local file`);
      }
    }
  }

  return files;
}

export function providersFiles(
  superJson: SuperJson = loadSuperJson()
): string[] {
  const files: string[] = [];

  for (const provider in superJson.normalized.providers) {
    const providerSettings = superJson.normalized.providers[provider];

    if (providerSettings !== undefined && !!providerSettings.file) {
      files.push(normalizePath(providerSettings.file, superJson));
    } else {
      throw new Error(
        `${provider} settings must be defined and lead to local file`
      );
    }
  }

  return files;
}

export async function localProviders(
  superJson = loadSuperJson()
): Promise<string[]> {
  const cwd = await SuperJson.detectSuperJson(process.cwd());

  return glob
    .sync('../providers/*.json', { cwd })
    .map(i => normalizePath(i, superJson));
}

export async function localProfiles(
  superJson = loadSuperJson()
): Promise<string[]> {
  const cwd = await SuperJson.detectSuperJson(process.cwd());

  return glob
    .sync('../capabilities/**/*.supr', {
      cwd,
    })
    .map(i => normalizePath(i, superJson));
}

export async function localMaps(
  superJson = loadSuperJson()
): Promise<string[]> {
  const cwd = await SuperJson.detectSuperJson(process.cwd());

  return glob
    .sync('../capabilities/**/*.suma', {
      cwd,
    })
    .map(i => normalizePath(i, superJson));
}

export function arrayDiff<T>(a: T[], b: T[]): T[] {
  return a.filter(x => !b.includes(x));
}
