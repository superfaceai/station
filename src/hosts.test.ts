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

  describe('#getServiceUrls', () => {
    it('should return all urls from services', () => {
      expect(getServiceUrls()).toEqual([
        'example.com',
        'example.coffee',
        'example.net',
      ]);
    });
  });
});
