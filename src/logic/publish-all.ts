import { ServiceApiError } from '@superfaceai/service-client';
import { glob } from 'glob';

import { LogCallback } from '../common';
import { publish } from '.';

export async function publishAll(
  baseUrl: string,
  options?: { logCb?: LogCallback; dryRun?: boolean }
): Promise<void> {
  options?.logCb?.(`Publishing all profiles, maps and providers to ${baseUrl}`);

  const providers = glob.sync('./providers/*.json');
  const profiles = glob.sync('./capabilities/**/*.supr');
  const maps = glob.sync('./capabilities/**/*.suma');

  const toPublish = [...providers, ...profiles, ...maps];
  const errors = [];

  for (const path of toPublish) {
    try {
      await publish(path, baseUrl, options);
      options?.logCb?.(`SUCCESS: Published`);
    } catch (err) {
      if (err instanceof ServiceApiError) {
        if (err.status === 422) {
          options?.logCb?.(`SUCCESS: Up to date`);
        } else {
          errors.push({ path, err });
          options?.logCb?.(`FAILED: ${err.message}`);
        }
      } else if (err instanceof Error) {
        errors.push({ path, err });
        options?.logCb?.(`FAILED: ${err.message}`);
      } else {
        options?.logCb?.('FAILED: With unknown error');
      }
    }
  }

  options?.logCb?.(
    `FINISHED publishing of ${toPublish.length} resources with ${errors.length} errors`
  );
}
