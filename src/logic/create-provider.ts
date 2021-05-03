import { SuperJson } from '@superfaceai/one-sdk';

import { LogCallback } from '../common';
import { EXTENSIONS, PROVIDERS_DIR, SUPER_JSON } from '../common/constants';
import { exists, mkdir, writeFile } from '../common/io';
import { providerTemplate } from '../common/templates';

export async function createProvider(
  providerName: string,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Create folder structure if it doesn't exist
  if (!(await exists(`./${PROVIDERS_DIR}`))) {
    await mkdir(`./${PROVIDERS_DIR}`);
  }

  //Create provider file
  await writeFile(
    `./${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`,
    providerTemplate(providerName)
  );

  options?.logCb?.(
    `Creating: "${providerName}${EXTENSIONS.provider}" file at: "./${PROVIDERS_DIR}"`
  );

  //Add provider to super.json
  const loadedResult = await SuperJson.load(SUPER_JSON);
  const superJson = loadedResult.match(
    v => v,
    err => {
      throw err;
    }
  );

  const newProvider = {
    file: `../${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`,
    security: [],
  };
  superJson.addProvider(providerName, newProvider);

  await writeFile(SUPER_JSON, superJson.stringified);
  options?.logCb?.(
    `Adding provider: "${providerName}" to superface/super.json`
  );
}
