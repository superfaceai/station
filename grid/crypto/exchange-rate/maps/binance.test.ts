import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`crypto/exchange-rate/binance}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'crypto/exchange-rate',
      provider: 'binance',
      useCase: 'GetExchangeRate',
    });
  });

  describe('GetExchangeRate', () => {
    it('should perform conversion', async () => {
      await expect(
        superface.run({
          input: {
            from: 'BTC',
            to: 'USDT',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform conversion back', async () => {
      await expect(
        superface.run({
          input: {
            from: 'USDT',
            to: 'BTC',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should fail on non-existing coins', async () => {
      await expect(
        superface.run({
          input: {
            from: 'FOO',
            to: 'BAR',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
