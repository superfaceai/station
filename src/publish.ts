import { isMapDocumentNode, isProfileDocumentNode } from '@superfaceai/ast';
import { BrainClient } from '@superfaceai/brain-client';
import { parseMap, parseProfile, Source } from '@superfaceai/parser';
import { isProviderJson } from '@superfaceai/sdk';

import { EXTENSIONS } from './constants';
import { exists, readFile } from './io';

export async function publish(): Promise<void> {
  const path = process.argv[2];
  if (!(await exists(path))) {
    throw new Error('Path does not exist');
  }
  if (!process.env.SUPERFACE_STORE_REFRESH_TOKEN) {
    throw new Error('Env variable SUPERFACE_STORE_REFRESH_TOKEN is missing');
  }
  if (
    path.endsWith(EXTENSIONS.map.build) ||
    path.endsWith(EXTENSIONS.profile.build)
  ) {
    throw new Error('Do not use compiled files! Use .supr or .suma files :)');
  }
  const client = new BrainClient({
    baseUrl: 'https://superface.dev',
    refreshToken: process.env.SUPERFACE_STORE_REFRESH_TOKEN,
  });

  const file = await readFile(path);

  if (path.endsWith(EXTENSIONS.provider)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedFile = JSON.parse(file);
    if (isProviderJson(parsedFile)) {
      await client.createProvider(file);
    } else {
      throw new Error('File does not have provider json structure');
    }
  } else if (path.endsWith(EXTENSIONS.profile.source)) {
    const parsedFile = parseProfile(new Source(file, path));
    if (isProfileDocumentNode(parsedFile)) {
      await client.createProfile(file);
    } else {
      throw new Error('Unknown profile file structure');
    }
  } else if (path.endsWith(EXTENSIONS.map.source)) {
    const parsedFile = parseMap(new Source(file, path));
    if (isMapDocumentNode(parsedFile)) {
      await client.createMap(file);
    } else {
      throw new Error('Unknown map file structure');
    }
  } else {
    throw new Error('Unknown file suffix');
  }
}
publish().catch(err => console.log('Error: ', err));
