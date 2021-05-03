import { SuperJson } from '@superfaceai/one-sdk';

import { LogCallback } from '../common';
import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_DIR,
  SUPER_JSON,
} from '../common/constants';
import { exists, mkdir, writeFile } from '../common/io';
import { mapTemplate, mapTestTemplate } from '../common/templates';

export async function createMap(
  scope: string,
  usecase: string,
  mapName: string,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Create folder structure if it doesn't exist
  if (!(await exists(`./${CAPABILITIES_DIR}`))) {
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
  options?.logCb?.(
    `Creating: "${mapName}${EXTENSIONS.map.source}" file at: "./${CAPABILITIES_DIR}/${scope}/${usecase}/maps/"`
  );

  //Create test for map file
  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/maps/${mapName}.test.ts`,
    mapTestTemplate(scope, usecase, mapName)
  );
  options?.logCb?.(
    `Creating: "${mapName}.test.ts" file at: "./${CAPABILITIES_DIR}/${scope}/${usecase}/maps/"`
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
  superJson.addProfileProvider(
    `${scope}/${usecase}`,
    mapName,
    newProfileProvider
  );

  await writeFile(SUPER_JSON, superJson.stringified);

  options?.logCb?.(
    `Adding map: "${mapName}" for profile: "${scope}/${usecase}" to superface/super.json`
  );
}
