import { SuperJson } from '@superfaceai/one-sdk';
import { mocked } from 'ts-jest/utils';
import * as fs from 'fs';

import * as util from './util';
import { ProviderJson } from '@superfaceai/ast';
import { getServiceUrls } from './hosts';

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

describe('hosts', () => {
  beforeEach(() => {
    mocked(util.providersFiles).mockReturnValue(['./one.json', './two.json']);

    mocked(util.loadSuperJson)
      .mockReset()
      .mockReturnValue(
        new SuperJson({
          providers: {
            one: {
              file: './one.json',
            },
            two: {
              file: './two.json',
            },
          },
        })
      );

    mocked(fs.readFileSync)
      .mockReturnValueOnce(JSON.stringify(providerOne))
      .mockReturnValueOnce(JSON.stringify(providerTwo));
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
        hosts.updateHosts(hostsWithoutSection, ['example.com', 'example.org'])
      ).toBe(
        `
${hostsWithoutSection}

# section superface
127.0.0.1 example.com example.org
# end section superface
      `.trim()
      );
    });
  });

  describe('#getServiceUrls', () => {
    it('should return all urls from services', () => {
      expect(getServiceUrls()).toEqual([
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
