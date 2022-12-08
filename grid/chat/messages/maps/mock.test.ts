import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('chat/messages/mock', () => {
  let superface: SuperfaceTest;

  beforeAll(() => {
    superface = buildSuperfaceTest({
      profile: 'chat/messages',
      provider: 'mock',
      useCase: 'GetMessages',
    });
  });

  describe('GetMessages', () => {
    it('performs correctly', async () => {
      const result = await superface.run({ input: { destination: 'random' } });

      expect(result.isOk() && (result.value as any).messages.length).toEqual(3);
    });
  });
});
