import Install from '@superfaceai/cli/dist/commands/install';

import {
  E2E_DIR,
  e2eTestTemplate,
  exists,
  EXTENSIONS,
  LogCallback,
  mkdir,
  writeFile,
} from '../common';

export async function prepareE2e(
  scope: string,
  profile: string,
  provider: string,
  options?: {
    logCb?: LogCallback;
    warnCb?: LogCallback;
  }
): Promise<void> {
  //Create test folder
  const cwd = process.cwd();
  if (!(await exists(`./test`))) {
    await mkdir(`./test`);
  }
  if (!(await exists(`./test/${E2E_DIR}`))) {
    await mkdir(`./test/${E2E_DIR}`);
  }
  if (!(await exists(`./test/${E2E_DIR}/${scope}`))) {
    await mkdir(`./test/${E2E_DIR}/${scope}`);
  }
  if (!(await exists(`./test/${E2E_DIR}/${scope}/${profile}`))) {
    await mkdir(`./test/${E2E_DIR}/${scope}/${profile}`);
  }

  const testPath = `./test/${E2E_DIR}/${scope}/${profile}/${provider}${EXTENSIONS.e2e}`;
  //Create test file
  await writeFile(testPath, e2eTestTemplate(scope, profile, provider));

  //Switch cwd and install capability
  process.chdir(`${cwd}/test/${E2E_DIR}/${scope}/${profile}`);
  await Install.run([`${scope}/${profile}`, '-p', provider, '-f']);
  process.chdir(cwd);

  options?.warnCb?.(
    `E2E test folder structure created. You can edit test file at "${testPath}" and run by "yarn test test/${E2E_DIR}/${scope}/${profile}/${provider}"`
  );
}
