import { SuperJsonDocument } from '@superfaceai/ast';
import { detectSuperJson, loadSuperJson, ok } from '@superfaceai/one-sdk';
import cp, { ChildProcess, ExecException } from 'child_process';
import * as glob from 'glob';
import { join } from 'path';
import { mocked } from 'ts-jest/utils';

import * as util from './util';

jest.mock('glob');

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@superfaceai/one-sdk', () => ({
  ...jest.requireActual('@superfaceai/one-sdk'),
  loadSuperJson: jest.fn(),
  detectSuperJson: jest.fn(),
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
    it('should call loadSuperJson once', async () => {
      mocked(detectSuperJson).mockResolvedValue('./superface');
      const spy = mocked(loadSuperJson).mockResolvedValue(
        ok(SUPER_JSON_DOCUMENT)
      );

      await util.loadSuperJson();

      expect(spy).toBeCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('normalizePath', () => {
    it('should call resolvePath on SuperJson', () => {
      const expectedPath = join(
        process.cwd(),
        'superface',
        'grid/profile.supr'
      );

      // TODO: support this in SDK?
      const path = util.normalizePath('./superface', './grid/profile.supr');

      expect(path).toBe(expectedPath);
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
      await expect(
        util.profilesFiles({
          document: SUPER_JSON_DOCUMENT,
          path: './superface',
        })
      ).resolves.toEqual([
        util.normalizePath('./superface', './one.supr'),
        util.normalizePath('./superface', './two.supr'),
      ]);
    });

    it("should throw if profile settings doesn't point to local file", async () => {
      await expect(
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
      ).rejects.toThrowError();
    });
  });

  describe('mapsFiles', () => {
    it('should return map with local file', async () => {
      await expect(
        util.mapsFiles({ document: SUPER_JSON_DOCUMENT, path: './superface' })
      ).resolves.toEqual([
        util.normalizePath('./superface', './one.suma'),
        util.normalizePath('./superface', './two.suma'),
      ]);
    });

    it("should throw if map doesn't point to local file", async () => {
      await expect(
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
      ).rejects.toThrowError();
    });
  });

  describe('providersFiles', () => {
    it('should return provider with local file', async () => {
      await expect(
        util.providersFiles({
          document: SUPER_JSON_DOCUMENT,
          path: './superface',
        })
      ).resolves.toEqual([
        util.normalizePath('./superface', './one.json'),
        util.normalizePath('./superface', './two.json'),
      ]);
    });

    it("should throw if provider settings doesn't point to local file", async () => {
      await expect(
        util.providersFiles({
          document: {
            providers: {
              provider: {},
            },
          },
          path: './superface',
        })
      ).rejects.toThrowError();
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
      expect(result).toEqual([join('/home', 'providers/one.json')]);
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
      expect(result).toEqual([join('/home', 'grid/send-email/profile.supr')]);
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
      expect(result).toEqual([join('/home', 'grid/send-email/provider.suma')]);
    });
  });

  describe('gitDiff', () => {
    let execCommand: string;

    type ExecSpy = (
      command: string,
      callback?: (
        error: ExecException | null,
        stdout: string,
        stderr: string
      ) => void
    ) => ChildProcess;

    describe('when branch names are valid', () => {
      let execSpy: jest.SpyInstance;

      beforeEach(() => {
        execSpy = (jest.spyOn(
          cp,
          'exec'
        ) as unknown) as jest.MockedFunction<ExecSpy>;
        execSpy.mockImplementation(function (
          command: string,
          callback?: (
            error: ExecException | null,
            stdout: string,
            stderr: string
          ) => void
        ): ChildProcess {
          execCommand = command;
          if (callback) {
            callback(
              null,
              `A   grid/starwars/character-information/profile.supr\nA   grid/starwars/character-information/maps/mock.suma`,
              ''
            );
          }

          return new ChildProcess();
        });
      });

      it('should call exec with valid params', async () => {
        await util.gitDiff('main', 'feat/add_mock_map');

        expect(execCommand).toEqual(
          'git diff --name-status main..feat/add_mock_map'
        );
      });

      it('should return files', async () => {
        const result = await util.gitDiff('main', 'feat/add_mock_map');

        expect(result).toEqual([
          'grid/starwars/character-information/profile.supr',
          'grid/starwars/character-information/maps/mock.suma',
        ]);
      });
    });

    describe("when branch name does't exist", () => {
      it('should throw error', async () => {
        const execSpy = (jest.spyOn(
          cp,
          'exec'
        ) as unknown) as jest.MockedFunction<ExecSpy>;
        execSpy.mockImplementation(function (
          command: string,
          callback?: (
            error: ExecException | null,
            stdout: string,
            stderr: string
          ) => void
        ): ChildProcess {
          execCommand = command;
          if (callback) {
            callback(
              null,
              '',
              "fatal: ambiguous argument 'main..wrong_branch_name': unknown revision or path not in the working tree."
            );
          }

          return new ChildProcess();
        });

        await expect(
          util.gitDiff('main', 'wrong_branch_name')
        ).rejects.toThrowError();
      });
    });

    describe('when exec callback error returned', () => {
      it('should throw error', async () => {
        const execSpy = (jest.spyOn(
          cp,
          'exec'
        ) as unknown) as jest.MockedFunction<ExecSpy>;
        execSpy.mockImplementation(function (
          command: string,
          callback?: (
            error: ExecException | null,
            stdout: string,
            stderr: string
          ) => void
        ): ChildProcess {
          execCommand = command;
          if (callback) {
            callback(new Error(), '', '');
          }

          return new ChildProcess();
        });

        await expect(util.gitDiff('main', 'feat')).rejects.toThrowError();
      });
    });
  });
});
