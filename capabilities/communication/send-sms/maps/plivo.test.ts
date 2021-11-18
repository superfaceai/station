import {
  RecordingDefinition,
  RecordingDefinitions,
  SuperfaceTest,
} from '@superfaceai/testing';

/* 
 * TODO: move this to testing library
   simple parsing is done before load where headers are not matching
   nock interface nock.Definition
 */
function assertRawHeaders(
  definition: RecordingDefinition
): asserts definition is RecordingDefinition & { rawHeaders: string[] } {
  if (!('rawHeaders' in definition)) {
    throw new Error('rawHeaders not found');
  }
}

const beforeRecordingLoad = (definitions: RecordingDefinitions) => {
  definitions.forEach((def: RecordingDefinition) => {
    assertRawHeaders(def);

    for (const [name, value] of def.rawHeaders.entries()) {
      def.rawHeaders[name] = value
        .toString()
        .replace(
          'parameters-removed-to-keep-them-secure',
          process.env.PLIVO_AUTH_ID as any
        );
    }
  });
};

describe('communication/send-sms/plivo', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'communication/send-sms',
      provider: 'plivo',
    });
  });

  describe('SendMessage', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'SendMessage',
          input: {
            to: '+4915207930698', // https://receive-smss.com/sms/4915207930698/
            from: 'Plivo APIs',
            text: 'Hello World!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('RetrieveMessageStatus', () => {
    it('should perform successfully', async () => {
      const result = await superface.run({
        useCase: 'SendMessage',
        input: {
          to: '+4915207930698', // https://receive-smss.com/sms/4915207930698/
          from: 'Plivo APIs 2',
          text: 'Hello World!',
        },
      });

      const messageId = (result.unwrap() as any).messageId;

      await expect(
        superface.run(
          {
            useCase: 'RetrieveMessageStatus',
            input: {
              messageId,
            },
          },
          {
            beforeRecordingLoad,
          }
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
