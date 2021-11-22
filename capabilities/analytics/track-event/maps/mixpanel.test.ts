import {
  RecordingDefinition,
  RecordingDefinitions,
  SuperfaceTest,
} from '@superfaceai/testing';

const beforeRecordingLoad = (definitions: RecordingDefinitions) => {
  definitions.forEach((def: RecordingDefinition) => {
    console.log(def.scope);
    def.scope = def.scope.replace(
      'parameters-removed-to-keep-them-secure',
      process.env.MIXPANEL_SERVER as string
    );
  });
};

describe(`analytics/track-event/mixpanel`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'analytics/track-event',
      provider: 'mixpanel',
    });
  });

  describe('TrackEvent', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run(
          {
            useCase: 'TrackEvent',
            input: {
              eventName: 'stationtest',
              eventProperties: {
                user: 'user_1',
              },
            },
          },
          { beforeRecordingLoad }
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
