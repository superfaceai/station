import { SuperJson } from '@superfaceai/one-sdk';

import { EXTENSIONS, PROVIDERS_DIR, SUPER_JSON } from './constants';
import { exists, mkdir, writeFile } from './io';
import { providerTemplate } from './templates';

export async function createProvider(): Promise<void> {
  const providerName = process.argv[2];

  //Create folder structure if it doesn't exist
  if (!(await exists(`./$${PROVIDERS_DIR}`))) {
    await mkdir(`./$${PROVIDERS_DIR}`);
  }

  //Create provider file
  await writeFile(
    `./${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`,
    providerTemplate(providerName)
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
}
createProvider().catch(err => console.log('Error: ', err));
