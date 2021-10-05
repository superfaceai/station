import { ProfileId } from '@superfaceai/cli/dist/common/profile';
import { check } from '@superfaceai/cli/dist/logic/check';
import { SuperJson } from '@superfaceai/one-sdk';
import { mocked } from 'ts-jest/utils';

import * as util from './util';
import * as validate from './validate';

jest.mock('@superfaceai/cli/dist/logic/check');
jest.mock('./util');

describe('validate', () => {
  beforeEach(() => {
    mocked(util.loadSuperJson).mockReturnValue(new SuperJson({}));
    mocked(util.allProfileProviderCombinations).mockReturnValue([
      {
        profile: { id: ProfileId.fromScopeName('scope', 'name') },
        provider: 'provider',
      },
    ]);
    mocked(util.localMaps).mockResolvedValue([]);
    mocked(util.localProfiles).mockResolvedValue([]);
    mocked(util.localProviders).mockResolvedValue([]);
    mocked(util.mapsFiles).mockReturnValue([]);
    mocked(util.profilesFiles).mockReturnValue([]);
    mocked(util.providersFiles).mockReturnValue([]);
    mocked(util.arrayDiff).mockReturnValue([]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('checkCapabilities', () => {
    it('should call allProfileProviderCombinations', async () => {
      await validate.checkCapabilities();
      expect(util.allProfileProviderCombinations).toBeCalled();
    });

    it('should call loadSuperJson', async () => {
      await validate.checkCapabilities();
      expect(util.loadSuperJson).toBeCalled();
    });

    it('should call CLI check', async () => {
      await validate.checkCapabilities();

      expect(check).toBeCalledTimes(1);
      expect(check).toBeCalledWith(
        new SuperJson({}),
        {
          id: {
            id: 'scope/name',
            scope: 'scope',
            name: 'name',
          },
        },
        'provider',
        {}
      );
    });

    it('should catch Error and return it as CheckResult', async () => {
      mocked(check).mockRejectedValue(new Error('Test error'));

      const result = await validate.checkCapabilities();

      expect(result).toEqual([{ kind: 'error', message: 'Test error' }]);
    });

    it('should catch not error instance and return it as CheckResult', async () => {
      mocked(check).mockRejectedValue('error as string');

      const result = await validate.checkCapabilities();

      expect(result).toEqual([{ kind: 'error', message: 'Unknown error' }]);
    });
  });

  describe('checkFiles', () => {
    it('should get all local files', async () => {
      await validate.checkFiles();

      expect(util.localProviders).toBeCalled();
      expect(util.localProfiles).toBeCalled();
      expect(util.localMaps).toBeCalled();
    });

    it('should get all files from super.json', async () => {
      await validate.checkFiles();

      expect(util.providersFiles).toBeCalled();
      expect(util.profilesFiles).toBeCalled();
      expect(util.mapsFiles).toBeCalled();
    });

    it('should call arrayDiff twice', async () => {
      await validate.checkFiles();

      expect(util.arrayDiff).toBeCalledTimes(2);
    });

    it('should return not linked files as warning', async () => {
      mocked(util.arrayDiff)
        .mockReset()
        .mockReturnValueOnce(['./provider.json'])
        .mockReturnValueOnce([]);

      const result = await validate.checkFiles();

      expect(result).toEqual([
        { kind: 'warn', message: `./provider.json isn't linked in super.json` },
      ]);
    });

    it('should return missing files as error', async () => {
      mocked(util.arrayDiff)
        .mockReset()
        .mockReturnValueOnce([])
        .mockReturnValueOnce(['./provider.json']);

      const result = await validate.checkFiles();

      expect(result).toEqual([
        {
          kind: 'error',
          message: `./provider.json linked in super.json doesn't exists`,
        },
      ]);
    });
  });

  describe('checkMockMap', () => {
    beforeEach(() => {
      mocked(util.loadSuperJson)
        .mockReset()
        .mockReturnValue(
          new SuperJson({
            profiles: {
              one: {
                file: './one.supr',
                providers: {
                  mock: {},
                },
              },
              two: {
                file: './two.supr',
                providers: {},
              },
            },
          })
        );
    });

    it('should return error check result for missing mock map', async () => {
      await expect(validate.checkMockMap()).resolves.toEqual([
        { kind: 'error', message: 'two is missing mock map' },
      ]);
    });
  });

  describe('run', () => {
    let print: jest.Mock;

    beforeEach(() => {
      print = jest.fn();
    });

    it('should call checkCapabilities', async () => {
      await validate.run(print);

      expect(check).toBeCalled();
    });

    it('should call checkFiles', async () => {
      await validate.run(print);

      expect(util.arrayDiff).toBeCalled();
    });

    it('should print No issues for passing validate', async () => {
      mocked(check).mockResolvedValue([]);

      await validate.run(print);

      expect(print).toBeCalledWith('No issues');
    });

    it('should print `error: test message` for failed validate', async () => {
      mocked(check).mockResolvedValue([
        { kind: 'error', message: 'test message' },
      ]);

      await validate.run(print);

      expect(print).toBeCalledWith('error: test message');
    });
  });
});
