import { SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

describe(`analytics/track-event/mixpanel`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'analytics/track-event',
        provider: 'mixpanel',
      },
      nockConfig
    );
  });

  describe('TrackEvent', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'TrackEvent',
          input: {
            eventName: 'stationtest',
            eventProperties: {
              user: 'user_1',
            },
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
