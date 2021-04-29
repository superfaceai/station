import { SuperJson } from '@superfaceai/one-sdk';

import { LogCallback } from '../common';
import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_DIR,
  SUPER_JSON,
} from '../common/constants';
import { exists, mkdir, writeFile } from '../common/io';
import { profileTemplate } from '../common/templates';

export async function createProfile(
  scope: string,
  usecase: string,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
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

  //Create profile file
  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/profile${EXTENSIONS.profile.source}`,
    profileTemplate(usecase, scope)
  );

  options?.logCb?.(
    `Creating: "profile${EXTENSIONS.profile.source}" file at: "./${CAPABILITIES_DIR}/${scope}/${usecase}/"`
  );

  //Add profile to super.json
  const loadedResult = await SuperJson.load(SUPER_JSON);
  const superJson = loadedResult.match(
    v => v,
    err => {
      throw err;
    }
  );

  const newProfile = {
    file: `./${PROFILE_BUILD_DIR}/${scope}/${usecase}/profile${EXTENSIONS.profile.source}`,
  };
  superJson.addProfile(`${scope}/${usecase}`, newProfile);

  await writeFile(SUPER_JSON, superJson.stringified);
  options?.logCb?.(
    `Adding profile: "${scope}/${usecase}" to superface/super.json`
  );
}
