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
        profile: { scope: 'scope', name: 'name' },
        provider: 'provider',
      },
    ]);
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
        { scope: 'scope', name: 'name' },
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

  describe('run', () => {
    let print: jest.Mock;

    beforeEach(() => {
      print = jest.fn();
    });

    it('should call checkCapabilities', async () => {
      await validate.run(print);

      expect(check).toBeCalled();
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
