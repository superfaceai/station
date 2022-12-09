import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`crm/track-contact-event/mock`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'crm/track-contact-event',
      provider: 'mock',
    });
  });

  describe('TrackContactEvent', () => {
    it('performs successfully', async () => {
      const result = await superface.run({
        useCase: 'TrackContactEvent',
        input: {
          contactId: 'support+station@superface.ai',
          eventName: 'order_sent',
          eventProperties: {
            orderId: 'or_12345',
            amount: '42',
            currency: 'EUR',
          },
        },
      });

      expect(result.unwrap()).toStrictEqual({
        contactId: 'support+station@superface.ai',
      });
    });
  });
});
