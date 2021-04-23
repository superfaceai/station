import { SuperJson } from '@superfaceai/one-sdk';

import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_DIR,
  SUPER_JSON,
} from './constants';
import { exists, mkdir, writeFile } from './io';
import { mapTemplate, mapTestTemplate } from './templates';

export async function createMap(): Promise<void> {
  const profileName = process.argv[2];
  const [scope, usecase] = profileName.split('/');
  const mapName = process.argv[3];

  //Create folder structure if it doesn't exist
  if (!(await exists(`./$${CAPABILITIES_DIR}`))) {
    await mkdir(`./$${CAPABILITIES_DIR}`);
  }

  if (!(await exists(`./${CAPABILITIES_DIR}/${scope}`))) {
    await mkdir(`./${CAPABILITIES_DIR}/${scope}`);
  }

  if (!(await exists(`./${CAPABILITIES_DIR}/${scope}/${usecase}`))) {
    await mkdir(`./${CAPABILITIES_DIR}/${scope}/${usecase}`);
  }

  if (!(await exists(`./${CAPABILITIES_DIR}/${scope}/${usecase}/maps`))) {
    await mkdir(`./${CAPABILITIES_DIR}/${scope}/${usecase}/maps`);
  }

  //Create map file
  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/maps/${mapName}${EXTENSIONS.map.source}`,
    mapTemplate(scope, usecase, mapName)
  );

  //Create test for map file
  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/maps/${mapName}.test.ts`,
    mapTestTemplate(scope, usecase, mapName)
  );

  //Add profile provider to super.json
  const loadedResult = await SuperJson.load(SUPER_JSON);
  const superJson = loadedResult.match(
    v => v,
    err => {
      throw err;
    }
  );

  const newProfileProvider = {
    file: `./${PROFILE_BUILD_DIR}/${scope}/${usecase}/maps/${mapName}${EXTENSIONS.map.source}`,
  };
  superJson.addProfileProvider(profileName, mapName, newProfileProvider);

  await writeFile(SUPER_JSON, superJson.stringified);
}
createMap().catch(e => console.log('Error: ', e));
