import { SuperJsonDocument } from '@superfaceai/ast';
import { loadSuperJson } from '@superfaceai/one-sdk';
import * as glob from 'glob';
import { mocked } from 'ts-jest/utils';

import * as util from './util';

jest.mock('glob');

jest.mock('@superfaceai/one-sdk', () => ({
  ...jest.requireActual('@superfaceai/one-sdk'),
  loadSuperJson: jest.fn(),
}))

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
    it('should call loadSync once', () => {
      const spy = mocked(loadSuperJson)

      util.loadSuperJson();
      util.loadSuperJson();

      expect(spy).toBeCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('normalizePath', () => {
    let superJson: SuperJson;

    beforeEach(() => {
      superJson = new SuperJson({});
    });

    // TODO: support this in SDK?
    it.skip('should call resolvePath on SuperJson', () => {
      const spy = jest.spyOn(superJson, 'resolvePath');

      util.normalizePath('./grid/profile.supr', superJson);

      expect(spy).toBeCalled();
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
    let superJson: SuperJson;

    beforeEach(() => {
      superJson = new SuperJson(SUPER_JSON_DOCUMENT);
    });

    it('should return all profiles with local file', () => {
      expect(util.profilesFiles(superJson)).toEqual([
        util.normalizePath('./one.supr', superJson),
        util.normalizePath('./two.supr', superJson),
      ]);
    });

    it("should throw if profile settings doesn't point to local file", () => {
      expect(() =>
        util.profilesFiles(
          new SuperJson({
            profiles: {
              profile: {
                version: '1.0.0',
                providers: {},
              },
            },
          })
        )
      ).toThrowError();
    });
  });

  describe('mapsFiles', () => {
    let superJson: SuperJson;

    beforeEach(() => {
      superJson = new SuperJson(SUPER_JSON_DOCUMENT);
    });

    it('should return map with local file', () => {
      expect(util.mapsFiles(superJson)).toEqual([
        util.normalizePath('./one.suma', superJson),
        util.normalizePath('./two.suma', superJson),
      ]);
    });

    it("should throw if map doesn't point to local file", () => {
      expect(() =>
        util.mapsFiles(
          new SuperJson({
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
          })
        )
      ).toThrowError();
    });
  });

  describe('providersFiles', () => {
    let superJson: SuperJson;

    beforeEach(() => {
      superJson = new SuperJson(SUPER_JSON_DOCUMENT);
    });

    it('should return provider with local file', () => {
      expect(util.providersFiles(superJson)).toEqual([
        util.normalizePath('./one.json', superJson),
        util.normalizePath('./two.json', superJson),
      ]);
    });

    it("should throw if provider settings doesn't point to local file", () => {
      expect(() =>
        util.providersFiles(
          new SuperJson({
            providers: {
              provider: {},
            },
          })
        )
      ).toThrowError();
    });
  });

  describe('localProviders', () => {
    let superJson: SuperJson;

    beforeEach(() => {
      superJson = new SuperJson({}, '/home');
    });

    it('should call glob with providers/*.json', async () => {
      mocked(glob.sync).mockReturnValue(['./providers/one.json']);
      jest.spyOn(SuperJson, 'detectSuperJson').mockResolvedValue('/home');

      const result = await util.localProviders(superJson);

      expect(glob.sync).toBeCalledWith('../providers/*.json', {
        cwd: '/home',
      });
      expect(result).toEqual(['/providers/one.json']);
    });
  });

  describe('localProfiles', () => {
    let superJson: SuperJson;

    beforeEach(() => {
      superJson = new SuperJson({}, '/home');
    });

    it('should call glob with grid/**/*.supr', async () => {
      mocked(glob.sync).mockReturnValue(['./grid/send-email/profile.supr']);
      jest.spyOn(SuperJson, 'detectSuperJson').mockResolvedValue('/home');

      const result = await util.localProfiles(superJson);

      expect(glob.sync).toBeCalledWith('../grid/**/*.supr', {
        cwd: '/home',
      });
      expect(result).toEqual(['/grid/send-email/profile.supr']);
    });
  });

  describe('localMaps', () => {
    let superJson: SuperJson;

    beforeEach(() => {
      superJson = new SuperJson({}, '/home');
    });

    it('should call glob with grid/**/*.suma', async () => {
      mocked(glob.sync).mockReturnValue(['./grid/send-email/provider.suma']);
      jest.spyOn(SuperJson, 'detectSuperJson').mockResolvedValue('/home');

      const result = await util.localMaps(superJson);

      expect(glob.sync).toBeCalledWith('../grid/**/*.suma', {
        cwd: '/home',
      });
      expect(result).toEqual(['/grid/send-email/provider.suma']);
    });
  });
});
