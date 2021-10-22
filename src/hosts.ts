import { isProviderJson } from '@superfaceai/ast';
import { readFileSync as readFile, writeFileSync as writeFile } from 'fs';
import { URL } from 'url';
import { format as formatTemplate } from 'util';

import { providersFiles } from './util';

export const SECTION_START = '# section superface';
export const SECTION_END = '# end section superface';
export const TEMPLATE = `
${SECTION_START}
127.0.0.1 %s
${SECTION_END}
`.trim();

export function load(): string {
  return readFile('/etc/hosts', { encoding: 'utf8' });
}

export function save(hosts: string): void {
  writeFile('/etc/hosts', hosts);
}

export function block(): void {
  const hosts = load();

  const serviceUrls = getServiceUrls();
  const updatedHosts = updateHosts(hosts, serviceUrls);

  save(updatedHosts);
}

export function allow(): void {
  const hosts = load();

  const updatedHosts = updateHosts(hosts, []);

  save(updatedHosts);
}

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

export function getServiceUrls(print = console.log): string[] {
  const providerPaths = providersFiles();

  const urls: string[] = [];

  for (const providerPath of providerPaths) {
    const providerJson: unknown = JSON.parse(
      readFile(providerPath, { encoding: 'utf8' })
    );

    if (!isProviderJson(providerJson)) {
      print(`WARN: ${providerPath} isn't valid provider definitions`);
      continue;
    }

    for (const service of providerJson.services) {
      try {
        const url = new URL(service.baseUrl);
        urls.push(url.host);
      } catch (e) {
        print(
          `WARN: Invalid url "${service.baseUrl}" for profile "${providerJson.name}" service "${service.id}"`
        );
      }
    }
  }

  return urls;
}

export function run(print = console.log): void {
  const action = process.argv[2];

  if (action === 'block') {
    block();
  } else if (action === 'allow') {
    allow();
  } else {
    print(`
    hosts.ts <action>

    action:
    - block
  `);
  }
}

if (require.main === module) {
  void run();
}
