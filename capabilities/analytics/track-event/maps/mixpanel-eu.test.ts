import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`analytics/track-event/mixpanel-eu`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('UseCase', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'analytics/track-event',
          provider: 'mixpanel-eu',
          useCase: 'TrackEvent',
          input: {
            eventName: 'stationtest',
            eventProperties: {
              user: 'user_1',
            },

            // OneSDK doesn't support credentials in bodies (this must be replaced with actual key when running against live API)
            token: 'xxx',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
