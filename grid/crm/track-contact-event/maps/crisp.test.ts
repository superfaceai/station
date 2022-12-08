import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`crm/track-contact-event/crisp`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'crm/track-contact-event',
      provider: 'crisp',
    });
  });

  describe('TrackContactEvent', () => {
    it('performs successfully', async () => {
      await expect(
        superface.run({
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
        })
      ).resolves.toMatchSnapshot();
    });

    it('returns error for non existent contact', async () => {
      await expect(
        superface.run({
          useCase: 'TrackContactEvent',
          input: {
            contactId: 'nonexistent+user@superface.test',
            eventName: 'order_sent',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
