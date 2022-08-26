import { SuperJsonDocument } from '@superfaceai/ast';
import { detectSuperJson, loadSuperJson } from '@superfaceai/one-sdk';
import * as glob from 'glob';
import { mocked } from 'ts-jest/utils';

import * as util from './util';

jest.mock('glob');

jest.mock('@superfaceai/one-sdk', () => ({
  ...jest.requireActual('@superfaceai/one-sdk'),
  loadSuperJson: jest.fn(),
}));

const SUPER_JSON_DOCUMENT: SuperJsonDocument = {
  profiles: {
    one: {
      file: './one.supr',
      providers: {
        one: {
          file: './one.suma',
        },
      },
    },
    two: {
      file: './two.supr',
      providers: {
        two: {
          file: './two.suma',
        },
      },
    },
  },
  providers: {
    one: {
      file: './one.json',
    },
    two: {
      file: './two.json',
    },
  },
};

describe('util', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('loadSuperJson', () => {
    it('should call loadSync once', async () => {
      const spy = mocked(loadSuperJson);

      await util.loadSuperJson();

      expect(spy).toBeCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('normalizePath', () => {
    // TODO: support this in SDK?
    it.skip('should call resolvePath on SuperJson', async () => {
      // const spy = jest.spyOn(superJson, 'resolvePath');

      const path = await util.normalizePath(
        './superface',
        './grid/profile.supr'
      );

      expect(path).toBe('./superface/grid/profile.supr');
    });
  });

  describe('exists', () => {
    it('should check file existence correctly', async () => {
      await expect(util.exists(__filename)).resolves.toEqual(true);
      await expect(util.exists('some/made/up/file.json')).resolves.toEqual(
        false
      );
    }, 10000);
  });

  describe('arrayDiff', () => {
    it('should return missing items in array b but not in a', () => {
      const a = [1, 2, 3];
      const b = [3, 4, 5];

      expect(util.arrayDiff(a, b)).toEqual([1, 2]);
    });
  });

  describe('profilesFiles', () => {
    it('should return all profiles with local file', async () => {
      expect(
        util.profilesFiles({
          document: SUPER_JSON_DOCUMENT,
          path: './superface',
        })
      ).toEqual([
        await util.normalizePath('./superface', './one.supr'),
        await util.normalizePath('./superface', './two.supr'),
      ]);
    });

    it("should throw if profile settings doesn't point to local file", () => {
      expect(() =>
        util.profilesFiles({
          document: {
            profiles: {
              profile: {
                version: '1.0.0',
                providers: {},
              },
            },
          },
          path: './superface',
        })
      ).toThrowError();
    });
  });

  describe('mapsFiles', () => {
    it('should return map with local file', () => {
      expect(
        util.mapsFiles({ document: SUPER_JSON_DOCUMENT, path: './superface' })
      ).toEqual([
        util.normalizePath('./superface', './one.suma'),
        util.normalizePath('./superface', './two.suma'),
      ]);
    });

    it("should throw if map doesn't point to local file", () => {
      expect(() =>
        util.mapsFiles({
          document: {
            profiles: {
              profile: {
                file: './profile.supr',
                providers: {
                  provider: {},
                },
              },
            },
            providers: {
              provider: {},
            },
          },
          path: './superface',
        })
      ).toThrowError();
    });
  });

  describe('providersFiles', () => {
    it('should return provider with local file', () => {
      expect(
        util.providersFiles({
          document: SUPER_JSON_DOCUMENT,
          path: './superface',
        })
      ).toEqual([
        util.normalizePath('./superface', './one.json'),
        util.normalizePath('./superface', './two.json'),
      ]);
    });

    it("should throw if provider settings doesn't point to local file", () => {
      expect(() =>
        util.providersFiles({
          document: {
            providers: {
              provider: {},
            },
          },
          path: './superface',
        })
      ).toThrowError();
    });
  });

  describe('localProviders', () => {
    it('should call glob with providers/*.json', async () => {
      mocked(glob.sync).mockReturnValue(['./providers/one.json']);
      mocked(detectSuperJson).mockResolvedValue('/home');

      const result = await util.localProviders();

      expect(glob.sync).toBeCalledWith('../providers/*.json', {
        cwd: '/home',
      });
      expect(result).toEqual(['/providers/one.json']);
    });
  });

  describe('localProfiles', () => {
    it('should call glob with grid/**/*.supr', async () => {
      mocked(glob.sync).mockReturnValue(['./grid/send-email/profile.supr']);
      mocked(detectSuperJson).mockResolvedValue('/home');

      const result = await util.localProfiles();

      expect(glob.sync).toBeCalledWith('../grid/**/*.supr', {
        cwd: '/home',
      });
      expect(result).toEqual(['/grid/send-email/profile.supr']);
    });
  });

  describe('localMaps', () => {
    it('should call glob with grid/**/*.suma', async () => {
      mocked(glob.sync).mockReturnValue(['./grid/send-email/provider.suma']);
      mocked(detectSuperJson).mockResolvedValue('/home');

      const result = await util.localMaps();

      expect(glob.sync).toBeCalledWith('../grid/**/*.suma', {
        cwd: '/home',
      });
      expect(result).toEqual(['/grid/send-email/provider.suma']);
    });
  });
});
