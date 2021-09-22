import { SuperJson } from '@superfaceai/one-sdk';
import { parseDocumentId } from '@superfaceai/parser';

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

export function arrayDiff<T>(a: T[], b: T[]): T[] {
  return a.filter(x => !b.includes(x));
}
