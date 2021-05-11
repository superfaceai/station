import { SuperJson } from '@superfaceai/one-sdk';

import { extractVersion, LogCallback } from '../common';
import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_DIR,
  SUPER_JSON,
} from '../common/constants';
import { mkdirQuiet, writeFile } from '../common/io';
import { profileTemplate } from '../common/templates';

export async function createProfile(
  scope: string,
  usecase: string,
  version: string,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Create folder structure if it doesn't exist
  await mkdirQuiet(`./${CAPABILITIES_DIR}`);
  await mkdirQuiet(`./${CAPABILITIES_DIR}/${scope}`);
  await mkdirQuiet(`./${CAPABILITIES_DIR}/${scope}/${usecase}`);
  await mkdirQuiet(`./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}`);

  //Parse version
  const parsedVersion = extractVersion(version);
  //Create profile file
  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/profile${EXTENSIONS.profile.source}`,
    profileTemplate(
      usecase,
      scope,
      `${parsedVersion.major}.${parsedVersion.minor ?? 0}`
    )
  );

  options?.logCb?.(
    `Creating: "profile${EXTENSIONS.profile.source}" file at: "./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/"`
  );

  await mkdirQuiet(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/superface`
  );

  //Add profile to super.json
  const loadedResult = await SuperJson.load(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/${SUPER_JSON}`
  );
  const superJson = loadedResult.match(
    v => v,
    _err => {
      return new SuperJson();
    }
  );

  const newProfile = {
    file: `./${PROFILE_BUILD_DIR}/profile${EXTENSIONS.profile.source}`,
  };
  superJson.addProfile(`${scope}/${usecase}`, newProfile);

  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/${SUPER_JSON}`,
    superJson.stringified
  );
  options?.logCb?.(
    `Adding profile: "${scope}/${usecase}" to ./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/${SUPER_JSON}`
  );
}
