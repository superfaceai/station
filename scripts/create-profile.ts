import { SuperJson } from '@superfaceai/sdk';

import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_DIR,
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
    file: `./${PROFILE_BUILD_DIR}/${scope}/${usecase}/profile${EXTENSIONS.profile.source}`,
  };
  superJson.addProfile(profileName, newProfile);

  await writeFile(SUPER_JSON, superJson.stringified);
}
createProfile().catch(e => console.log('Error: ', e));
