import { CLIError } from '@oclif/errors';
import { isMapDocumentNode, isProfileDocumentNode } from '@superfaceai/ast';
import { isProviderJson } from '@superfaceai/one-sdk';
import { parseMap, parseProfile, Source } from '@superfaceai/parser';
import { ServiceClient } from '@superfaceai/service-client';
import { config } from 'dotenv';

import { LogCallback } from '../common';
import { EXTENSIONS } from '../common/constants';
import { exists, readFile } from '../common/io';

export async function publish(
  path: string,
  baseUrl: string,
  options?: {
    logCb?: LogCallback;
    dryRun?: boolean;
  }
): Promise<void> {
  config();

  if (!(await exists(path))) {
    throw new CLIError('Path does not exist', { exit: 1 });
  }
  if (!process.env.SUPERFACE_STORE_REFRESH_TOKEN) {
    throw new CLIError(
      'Env variable SUPERFACE_STORE_REFRESH_TOKEN is missing',
      { exit: 1 }
    );
  }
  if (
    path.endsWith(EXTENSIONS.map.build) ||
    path.endsWith(EXTENSIONS.profile.build)
  ) {
    throw new CLIError('Do not use compiled files! Use .supr or .suma files', {
      exit: 1,
    });
  }

  const client = new ServiceClient({
    baseUrl,
    refreshToken: process.env.SUPERFACE_STORE_REFRESH_TOKEN,
  });
  const file = await readFile(path);

  if (path.endsWith(EXTENSIONS.provider)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedFile = JSON.parse(file);
    if (isProviderJson(parsedFile)) {
      options?.logCb?.(`Publishing provider ${parsedFile.name} from: ${path}`);

      if (!options?.dryRun) {
        await client.createProvider(file);
      }
    } else {
      throw new CLIError('File does not have provider json structure', {
        exit: 1,
      });
    }
  } else if (path.endsWith(EXTENSIONS.profile.source)) {
    const parsedFile = parseProfile(new Source(file, path));
    if (isProfileDocumentNode(parsedFile)) {
      options?.logCb?.(
        `Publishing profile "${parsedFile.header.name}" from: ${path}`
      );
      if (!options?.dryRun) {
        await client.createProfile(file);
      }
    } else {
      throw new CLIError('Unknown profile file structure', { exit: 1 });
    }
  } else if (path.endsWith(EXTENSIONS.map.source)) {
    const parsedFile = parseMap(new Source(file, path));
    if (isMapDocumentNode(parsedFile)) {
      options?.logCb?.(
        `Publishing map for profile "${parsedFile.header.profile.name}" and provider "${parsedFile.header.provider}" from: ${path}`
      );

      if (!options?.dryRun) {
        await client.createMap(file);
      }
    } else {
      throw new CLIError('Unknown map file structure', { exit: 1 });
    }
  } else {
    throw new CLIError('Unknown file suffix', { exit: 1 });
  }
}
