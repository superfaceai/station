import { SuperJson } from '@superfaceai/one-sdk';

import { LogCallback } from '../common';
import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROVIDERS_DIR,
  SUPER_JSON,
} from '../common/constants';
import { exists, mkdir, writeFile } from '../common/io';
import { providerTemplate } from '../common/templates';

export async function createProvider(
  providerName: string,
  scope: string,
  usecase: string,
  version: string,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Create folder structure if it doesn't exist
  if (!(await exists(`./${PROVIDERS_DIR}`))) {
    await mkdir(`./${PROVIDERS_DIR}`);
  }

  //Create provider file
  if (
    await exists(`./${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`)
  ) {
    options?.logCb?.(
      `File: "${providerName}${EXTENSIONS.provider}" file at: "./${PROVIDERS_DIR}" already exists - reusing it`
    );
  } else {
    options?.logCb?.(
      `Creating: "${providerName}${EXTENSIONS.provider}" file at: "./${PROVIDERS_DIR}"`
    );
    await writeFile(
      `./${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`,
      providerTemplate(providerName)
    );
  }

  if (
    !(await exists(
      `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/superface`
    ))
  ) {
    await mkdir(
      `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/superface`
    );
  }

  //Add provider to super.json
  const loadedResult = await SuperJson.load(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/${SUPER_JSON}`
  );
  const superJson = loadedResult.match(
    v => v,
    _err => {
      return new SuperJson();
    }
  );

  const newProvider = {
    file: `../${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`,
    security: [],
  };
  superJson.addProvider(providerName, newProvider);

  await writeFile(
    `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/${SUPER_JSON}`,
    superJson.stringified
  );
  options?.logCb?.(
    `Adding provider: "${providerName}" to superface/super.json`
  );
}
