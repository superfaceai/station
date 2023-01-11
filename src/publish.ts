import {
  isMapDocumentNode,
  isProfileDocumentNode,
  isProviderJson,
} from '@superfaceai/ast';
import { parseMap, parseProfile, Source } from '@superfaceai/parser';
import { ServiceApiError, ServiceClient } from '@superfaceai/service-client';
import { promisify } from 'util';

import {
  exists,
  EXTENSIONS,
  localMaps,
  localProfiles,
  localProviders,
  PrintFn,
  readFile,
} from './util';

const sleep = promisify(setTimeout);

export type PublishOptions = {
  print?: PrintFn;
  baseUrl?: string;
  refreshToken?: string;
};

export async function publish(
  path: string,
  options?: PublishOptions
): Promise<void> {
  if (!(await exists(path))) {
    throw new Error('Path does not exist');
  }

  const client = new ServiceClient({
    baseUrl: options?.baseUrl,
    refreshToken: options?.refreshToken,
  });

  const file = await readFile(path);

  if (path.endsWith(EXTENSIONS.provider)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedFile = JSON.parse(file);
    if (isProviderJson(parsedFile)) {
      options?.print?.(`Publishing provider ${parsedFile.name} from: ${path}`);
      await client.createProvider(file);
    } else {
      throw new Error('File does not have provider json structure');
    }
  } else if (path.endsWith(EXTENSIONS.profile)) {
    const parsedFile = parseProfile(new Source(file, path));
    if (isProfileDocumentNode(parsedFile)) {
      options?.print?.(
        `Publishing profile "${parsedFile.header.name}" from: ${path}`
      );
      await client.createProfile(file);
    } else {
      throw new Error('Unknown profile file structure');
    }
  } else if (path.endsWith(EXTENSIONS.map)) {
    const parsedFile = parseMap(new Source(file, path));
    if (isMapDocumentNode(parsedFile)) {
      options?.print?.(
        `Publishing map for profile "${parsedFile.header.profile.name}" and provider "${parsedFile.header.provider}" from: ${path}`
      );

      await client.createMap(file);
    } else {
      throw new Error('Unknown map file structure');
    }
  } else {
    throw new Error('Unknown file suffix');
  }
}

export async function publishAll(options?: PublishOptions): Promise<{
  errors: { path: string; error: Error | ServiceApiError }[];
  localFiles: string[];
}> {
  const localFiles: string[] = [];
  localFiles.push(...(await localProviders()));
  localFiles.push(...(await localProfiles()));
  localFiles.push(...(await localMaps()));

  const errors: { path: string; error: Error | ServiceApiError }[] = [];

  for (const path of localFiles) {
    try {
      await publish(path, options);
      options?.print?.(`SUCCESS: Published`);
    } catch (error) {
      if (error instanceof ServiceApiError) {
        if (error.status === 422) {
          options?.print?.(`SUCCESS: Up to date`);
        } else {
          errors.push({ path, error });
          options?.print?.(`FAILED: ${error.message}`);
        }
      } else if (error instanceof Error) {
        errors.push({ path, error });
        options?.print?.(`FAILED: ${error.message}`);
      } else {
        options?.print?.('FAILED: With unknown error');
      }
    } finally {
      const delay = parseInt(process.env.PUBLISH_DELAY_MS ?? '0');
      if (delay) {
        options?.print?.(`Waiting ${delay} ms`);
        await sleep(delay);
      }
    }
  }

  return { localFiles, errors };
}

export async function run(): Promise<void> {
  if (!process.env.SUPERFACE_REFRESH_TOKEN) {
    throw new Error('Env variable SUPERFACE_REFRESH_TOKEN is missing');
  }

  const options: PublishOptions = {
    print: console.log,
    baseUrl: process.env.SUPERFACE_API_URL,
    refreshToken: process.env.SUPERFACE_REFRESH_TOKEN,
  };

  const { localFiles, errors } = await publishAll(options);

  if (errors.length === 0) {
    console.log(`FINISHED publishing of ${localFiles.length} resources`);
    process.exitCode = 0;
  } else {
    console.log(
      `FINISHED publishing of ${localFiles.length} resources with ${errors.length} errors`
    );
    process.exitCode = 1;
  }
}

if (require.main === module) {
  void run();
}
