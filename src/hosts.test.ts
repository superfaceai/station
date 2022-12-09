import { ProviderJson } from '@superfaceai/ast';
import * as fs from 'fs';
import { mocked } from 'ts-jest/utils';

import * as hosts from './hosts';
import * as util from './util';

jest.mock('./util');
jest.mock('fs');

const providerOne: ProviderJson = {
  name: 'one',
  services: [
    {
      id: 'default',
      baseUrl: 'https://example.com',
    },
    {
      id: 'auth',
      baseUrl: 'https://example.coffee',
    },
  ],
  defaultService: 'default',
};

const providerTwo: ProviderJson = {
  name: 'two',
  services: [
    {
      id: 'default',
      baseUrl: 'https://example.net',
    },
    {
      id: 'invalid',
      baseUrl: 'invalid url',
    },
  ],
  defaultService: 'default',
};

const hostsWithoutSection = `
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
`.trim();

const hostsWithSection = `
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost

# section superface
127.0.0.1 example.com
# end section superface
`.trim();

describe('hosts', () => {
  beforeEach(() => {
    mocked(util.providersFiles).mockResolvedValue(['./one.json', './two.json']);
  });

  describe('#updateHosts', () => {
    it('should remove original section if urls are empty string', () => {
      expect(hosts.updateHosts(hostsWithSection, [])).toBe(hostsWithoutSection);
    });

    it('should add section with service urls', () => {
      expect(hosts.updateHosts(hostsWithoutSection, ['example.com'])).toBe(
        hostsWithSection
      );
    });

    it('should replace section with service urls', () => {
      expect(
        hosts.updateHosts(hostsWithoutSection, ['example.com', 'example.net'])
      ).toBe(
        `
${hostsWithoutSection}

# section superface
127.0.0.1 example.com example.net
# end section superface
      `.trim()
      );
    });
  });

  describe('#getServiceUrls', () => {
    beforeEach(() => {
      mocked(fs.readFileSync)
        .mockReturnValueOnce(JSON.stringify(providerOne))
        .mockReturnValueOnce(JSON.stringify(providerTwo));
    });

    it('should return all urls from services', async () => {
      await expect(hosts.getServiceUrls()).resolves.toEqual([
        'example.com',
        'example.coffee',
        'example.net',
      ]);
    });
  });

  describe('#load', () => {
    beforeEach(() => {
      hosts.load();
    });

    it('should call readFileSync', () => {
      expect(fs.readFileSync).toBeCalledWith('/etc/hosts', {
        encoding: 'utf8',
      });
    });
  });

  describe('#save', () => {
    beforeEach(() => {
      hosts.save('');
    });

    it('should call writeFileSync', () => {
      expect(fs.writeFileSync).toBeCalledWith('/etc/hosts', '');
    });
  });
});
