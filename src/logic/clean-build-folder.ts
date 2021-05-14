import rimraf from 'rimraf';

import { LogCallback, PROFILE_BUILD_PATH } from '../common';

export async function cleanBuildFolder(options?: {
  logCb?: LogCallback;
}): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    rimraf(PROFILE_BUILD_PATH, error => {
      if (error) {
        options?.logCb?.(
          `Cleaning build folder ./${PROFILE_BUILD_PATH}/ failed with error ${error.message}`
        );
        reject(error);
      }
      options?.logCb?.(`Cleaning build folder ./${PROFILE_BUILD_PATH}/`);
      resolve();
    });
  });
}
