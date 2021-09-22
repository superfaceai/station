import { SuperJson } from '@superfaceai/one-sdk';
import { parseDocumentId } from '@superfaceai/parser';
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

export type CheckCombination = {
  profile: { scope?: string; name: string };
  provider: string;
};

let superJson: SuperJson;

export function loadSuperJson(): SuperJson {
  if (!superJson) {
    superJson = SuperJson.loadSync().unwrap();
  }

  return superJson;
}

export function allProfileProviderCombinations(
  superJson: SuperJson = loadSuperJson()
): CheckCombination[] {
  const profiles = superJson.normalized.profiles;
  const checkCombinations: CheckCombination[] = [];

  for (const profileId in profiles) {
    const parseResult = parseDocumentId(profileId);

    if (parseResult.kind === 'error') {
      throw new Error(`Invalid profile id: ${parseResult.message}`);
    }

    const profile = {
      name: parseResult.value.middle[0],
      scope: parseResult.value.scope,
    };

    const profileSettings = profiles[profileId];
    for (const provider in profileSettings.providers) {
      checkCombinations.push({ profile, provider });
    }
  }

  return checkCombinations;
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
  const data = await read(path);
  if (Buffer.isBuffer(data)) {
    return data.toString('utf8');
  } else {
    return data;
  }
}

export function profilesFiles(
  superJson: SuperJson = loadSuperJson()
): string[] {
  const files: string[] = [];

  for (const profileId in superJson.normalized.profiles) {
    const profileSettings = superJson.normalized.profiles[profileId];

    if (profileSettings !== undefined && 'file' in profileSettings) {
      files.push(normalizePath(profileSettings.file));
    } else {
      // explode?
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
        files.push(normalizePath(map.file));
      } else {
        // explode?
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
      files.push(normalizePath(providerSettings.file));
    } else {
      // explode?
    }
  }

  return files;
}

export async function localProviders(): Promise<string[]> {
  const cwd = await SuperJson.detectSuperJson(process.cwd());

  return glob.sync('../providers/*.json', { cwd }).map(i => normalizePath(i));
}

export async function localProfiles(): Promise<string[]> {
  const cwd = await SuperJson.detectSuperJson(process.cwd());

  return glob
    .sync('../capabilities/**/*.supr', {
      cwd,
    })
    .map(i => normalizePath(i));
}

export async function localMaps(): Promise<string[]> {
  const cwd = await SuperJson.detectSuperJson(process.cwd());

  return glob
    .sync('../capabilities/**/*.suma', { cwd })
    .map(i => normalizePath(i));
}

export function arrayDiff<T>(a: T[], b: T[]): T[] {
  return a.filter(x => !b.includes(x));
}
