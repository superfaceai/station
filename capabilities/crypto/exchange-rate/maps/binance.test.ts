// import { SuperfaceTest, TestingReturn } from '@superfaceai/testing';
import { SuperfaceTest } from '@superfaceai/testing';

describe(`crypto/exchange-rate/binance}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('GetExchangeRate', () => {
    it('should perform conversion', async () => {
      await expect(
        superface.run({
          profile: 'crypto/exchange-rate',
          provider: 'binance',
          useCase: 'GetExchangeRate',
          input: {
            from: 'BTC',
            to: 'USDT',
          },
        })
      ).resolves.toHaveProperty(
        'value.rate',
        expect.stringMatching(/^\d{1,}\.?\d{0,}$/)
      );
    });

    // todo currently fails
    // mapping has a bug - returns error as success
    // it('should perform conversion back', async () => {
    //   await expect(
    //     superface.run({
    //       profile: 'crypto/exchange-rate',
    //       provider: 'binance',
    //       useCase: 'GetExchangeRate',
    //       input: {
    //         from: 'USDT',
    //         to: 'BTC'
    //       }
    //     })
    //   ).resolves
    //   .toHaveProperty('value.rate', expect.stringMatching(/^\d{1,}\.?\d{0,}$/));
    // });

    // todo currently fails
    // same reason as test above. Will also require recording of snapshot once bug is fixed
    // it ('should fail on non-existing coins', async () => {
    //   await expect(
    //     superface.run({
    //       profile: 'crypto/exchange-rate',
    //       provider: 'binance',
    //       useCase: 'GetExchangeRate',
    //       input: {
    //         from: 'FOO',
    //         to: 'BAR'
    //       }
    //     })
    //   ).resolves
    //   .toMatchSnapshot();
    // });
  });
});
