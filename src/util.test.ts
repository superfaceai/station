import { SuperJson } from '@superfaceai/one-sdk';

import * as util from './util';

describe('util', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('loadSuperJson', () => {
    it('should call loadSync once', () => {
      const spy = jest.spyOn(SuperJson, 'loadSync');

      util.loadSuperJson();
      util.loadSuperJson();

      expect(spy).toBeCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('allProfileProviderCombinations', () => {
    let mockSuperJson: SuperJson;

    beforeEach(() => {
      mockSuperJson = new SuperJson({
        profiles: {
          'scope/name': {
            file: '',
            providers: {
              providerOne: {},
              providerTwo: {},
            },
          },
        },
        providers: {
          providerOne: {
            file: '',
          },
          providerTwo: {
            file: '',
          },
        },
      });
    });

    it('should return all profile + provider combinations', () => {
      const result = util.allProfileProviderCombinations(mockSuperJson);

      expect(result).toEqual([
        {
          profile: {
            scope: 'scope',
            name: 'name',
          },
          provider: 'providerOne',
        },
        {
          profile: {
            scope: 'scope',
            name: 'name',
          },
          provider: 'providerTwo',
        },
      ]);
    });
  });
});
