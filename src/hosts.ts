import { isProviderJson } from '@superfaceai/ast';
import { readFileSync as readFile } from 'fs';
import { URL } from 'url';

import { providersFiles } from './util';

export const SECTION_START = '# section superface';
export const SECTION_END = '# end section superface';
export const TEMPLATE = `
${SECTION_START}
127.0.0.1 %s
${SECTION_END}
`.trim();

export function updateHosts(hosts: string, serviceUrls: string[]): string {
  const sectionStart = hosts.indexOf(SECTION_START);
  const sectionEnd = hosts.indexOf(SECTION_END) + SECTION_END.length;

  let cleanHosts: string;

  if (sectionStart > -1 && sectionEnd > -1) {
    const head = hosts.substr(0, sectionStart);
    const tail = hosts.substr(sectionEnd);

    cleanHosts = head + tail;
  } else {
    cleanHosts = hosts;
  }

  cleanHosts = cleanHosts.trim();

  if (serviceUrls.length === 0) {
    return cleanHosts;
  }

  return `
${cleanHosts}

${formatTemplate(TEMPLATE, serviceUrls.join(' '))}
  `.trim();
}

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
