import { SuperJson } from '@superfaceai/one-sdk';
import { mocked } from 'ts-jest/utils';

import * as stationStructure from './station_structure';
import * as util from './util';

jest.mock('./util');

describe('Station Structure', () => {
  beforeEach(() => {
    mocked(util.loadSuperJson).mockReturnValue(new SuperJson({}));
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

  describe('checkFiles', () => {
    it('should get all local files', async () => {
      await stationStructure.checkFiles();

      expect(util.localProviders).toBeCalled();
      expect(util.localProfiles).toBeCalled();
      expect(util.localMaps).toBeCalled();
    });

    it('should get all files from super.json', async () => {
      await stationStructure.checkFiles();

      expect(util.providersFiles).toBeCalled();
      expect(util.profilesFiles).toBeCalled();
      expect(util.mapsFiles).toBeCalled();
    });

    it('should call arrayDiff twice', async () => {
      await stationStructure.checkFiles();

      expect(util.arrayDiff).toBeCalledTimes(2);
    });

    it('should return not linked files as warning', async () => {
      mocked(util.arrayDiff)
        .mockReturnValueOnce(['./provider.json'])
        .mockReturnValueOnce([]);

      const result = await stationStructure.checkFiles();

      expect(result).toEqual([
        { kind: 'warn', message: `./provider.json isn't linked in super.json` },
      ]);
    });

    it('should return missing files as error', async () => {
      mocked(util.arrayDiff)
        .mockReset()
        .mockReturnValueOnce([])
        .mockReturnValueOnce(['./provider.json']);

      const result = await stationStructure.checkFiles();

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
      await expect(stationStructure.checkMockMap()).resolves.toEqual([
        { kind: 'error', message: 'two is missing mock map' },
      ]);
    });
  });
});
