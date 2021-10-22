import { isProviderJson } from '@superfaceai/ast';
import { readFileSync as readFile } from 'fs';
import { URL } from 'url';

import { providersFiles } from './util';

export function blockAll() {}

export function allowAll() {}

export function getServiceUrls(): string[] {
  const providerPaths = providersFiles();

  const urls: string[] = [];

  for (const providerPath of providerPaths) {
    const providerJson: unknown = JSON.parse(
      readFile(providerPath, { encoding: 'utf8' })
    );

    if (!isProviderJson(providerJson)) {
      console.log(`${providerPath} isn't valid provider definitions`);
      continue;
    }

    for (const service of providerJson.services) {
      try {
        const url = new URL(service.baseUrl);
        urls.push(url.host);
      } catch (e) {
        console.error(
          `Invalid url "${service.baseUrl}" for profile "${providerJson.name}" service "${service.id}"`
        );
      }
    }
  }

  return urls;
}
