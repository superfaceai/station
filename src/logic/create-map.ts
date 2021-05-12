import { extractVersion } from '@superfaceai/ast';
import { SuperJson } from '@superfaceai/one-sdk';

import { LogCallback } from '../common';
import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_DIR,
  SUPER_JSON,
} from '../common/constants';
import { exists, mkdir, mkdirQuiet, writeFile } from '../common/io';
import { mapTemplate, mapTestTemplate } from '../common/templates';

export async function createMap(
  scope: string,
  usecase: string,
  version: string,
  mapName: string,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Create folder structure if it doesn't exist
  await mkdirQuiet(`./${CAPABILITIES_DIR}`);
  await mkdirQuiet(`./${CAPABILITIES_DIR}/${scope}`);
  await mkdirQuiet(`./${CAPABILITIES_DIR}/${scope}/${usecase}`);
  await mkdirQuiet(`./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}`);
  await mkdirQuiet(`./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/maps`);

  //Parse version
  const parsedVersion = extractVersion(version);
  //Create map file
  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/maps/${mapName}${EXTENSIONS.map.source}`,
    mapTemplate(
      scope,
      usecase,
      mapName,
      `${parsedVersion.major}.${parsedVersion.minor ?? 0}`
    )
  );
  options?.logCb?.(
    `Creating: "${mapName}${EXTENSIONS.map.source}" file at: "./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/maps/"`
  );

  //Create test for map file
  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/maps/${mapName}.test.ts`,
    mapTestTemplate(scope, usecase, mapName, version)
  );
  options?.logCb?.(
    `Creating: "${mapName}.test.ts" file at: "./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/maps/"`
  );

  if (
    !(await exists(
      `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/superface`
    ))
  ) {
    await mkdir(
      `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/superface`
    );
  }

  //Add profile provider to super.json
  const loadedResult = await SuperJson.load(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/${SUPER_JSON}`
  );
  const superJson = loadedResult.match(
    v => v,
    _err => {
      return new SuperJson();
    }
  );

  const newProfileProvider = {
    file: `./${PROFILE_BUILD_DIR}/maps/${mapName}${EXTENSIONS.map.source}`,
  };
  superJson.addProfileProvider(
    `${scope}/${usecase}`,
    mapName,
    newProfileProvider
  );

  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/${SUPER_JSON}`,
    superJson.stringified
  );

  options?.logCb?.(
    `Adding map: "${mapName}" for profile: "${scope}/${usecase}" to ./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/maps/${SUPER_JSON}`
  );
}
