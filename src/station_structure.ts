import { IFileSystem, normalizeSuperJsonDocument } from '@superfaceai/one-sdk';

import {
  arrayDiff,
  loadSuperJson,
  localMaps,
  localProfiles,
  localProviders,
  mapsFiles,
  profilesFiles,
  providersFiles,
} from './util';

export type CheckResult = {
  kind: 'error' | 'warn';
  message: string;
};

export async function checkFiles(options?: {
  fileSystem?: IFileSystem;
}): Promise<CheckResult[]> {
  const superJson = await loadSuperJson(options);
  const localFiles: string[] = [];

  localFiles.push(...(await localProviders(options)));
  localFiles.push(...(await localProfiles(options)));
  localFiles.push(...(await localMaps(options)));

  const superJsonFiles: string[] = [];
  superJsonFiles.push(...(await providersFiles(superJson)));
  superJsonFiles.push(...(await profilesFiles(superJson)));
  superJsonFiles.push(...(await mapsFiles(superJson)));

  const notLinkedInSuperJson = arrayDiff(localFiles, superJsonFiles);
  const missingFiles = arrayDiff(superJsonFiles, localFiles);

  const result: CheckResult[] = [];

  notLinkedInSuperJson.forEach(file => {
    result.push({
      kind: 'warn',
      message: `${file} isn't linked in super.json`,
    });
  });

  missingFiles.forEach(file => {
    result.push({
      kind: 'error',
      message: `${file} linked in super.json doesn't exists`,
    });
  });

  return result;
}

export async function checkMockMap(options?: {
  fileSystem?: IFileSystem;
}): Promise<CheckResult[]> {
  const { document } = await loadSuperJson(options);
  const superJson = normalizeSuperJsonDocument(document);
  const results: CheckResult[] = [];

  for (const profileId in superJson.profiles) {
    const profileSettings = superJson.profiles[profileId];

    const mockProvider = profileSettings.providers.mock;

    if (!mockProvider) {
      results.push({
        kind: 'error',
        message: `${profileId} is missing mock map`,
      });
    }
  }

  return results;
}

export async function run(
  print = console.log,
  options?: { fileSystem?: IFileSystem }
): Promise<void> {
  const results: CheckResult[] = [];

  results.push(...(await checkFiles(options)));
  results.push(...(await checkMockMap()));
  // TODO: check test is present

  if (results.length === 0) {
    print('No issues');
    process.exitCode = 0;
  }

  let hasError = false;

  results.forEach(result => {
    if (result.kind === 'error') {
      hasError = true;
    }
    print(`${result.kind}: ${result.message}`);
  });

  process.exitCode = hasError ? 1 : 0;
}

if (require.main === module) {
  void run();
}
