import { SuperJson } from '@superfaceai/sdk';

import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_PATH,
  SUPER_JSON,
} from './constants';
import { exists, mkdir, writeFile } from './io';
import { profileTemplate } from './templates';

async function createProfile() {
  const profileName = process.argv[2];
  const [scope, usecase] = profileName.split('/');

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

  //Add profile to super.json
  const loadedResult = await SuperJson.load(SUPER_JSON);
  const superJson = loadedResult.match(
    v => v,
    err => {
      throw err;
    }
  );

  const newProfile = {
    id: profileName,
    version: '1.0.0',
    file: `./${PROFILE_BUILD_PATH}/${scope}/${usecase}/profile${EXTENSIONS.profile.build}`,
  };
  superJson.addProfile(profileName, newProfile);

  await writeFile(SUPER_JSON, superJson.stringified);
}
createProfile().catch(e => console.log('Error: ', e));
