import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe('chat/messages/mock', () => {
  let superface: SuperfaceTest;

  beforeAll(() => {
    superface = new SuperfaceTest(
      { profile: 'chat/messages', provider: 'mock', useCase: 'GetMessages' },
      nockConfig
    );
  });

  describe('GetMessages', () => {
    it('performs correctly', async () => {
      const result = await superface.run({ input: { destination: 'random' } });

      expect(result.isOk() && (result.value as any).messages.length).toEqual(3);
    });
  });
});
