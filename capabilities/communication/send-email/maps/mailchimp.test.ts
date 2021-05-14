import { MappedHTTPError, Provider } from '@superfaceai/one-sdk';

import {
  CommunicationSendEmailProfile,
  SuperfaceClient,
} from '../../../../superface/sdk';

describe('communication/send-email/mailchimp', () => {
  let client: InstanceType<typeof SuperfaceClient>;
  let profile: CommunicationSendEmailProfile;
  let provider: Provider;

  beforeEach(async () => {
    client = new SuperfaceClient();
    profile = await client.getProfile('communication/send-email');
    provider = await client.getProvider('mailchimp');
  });

  it('should find provider', async () => {
    expect(provider).not.toBeUndefined();
  });

  describe('when all inputs are correct', () => {
    it('should return messagaId as result', async () => {
      const result = await profile.useCases.SendEmail.perform(
        {
          from: process.env.MAILCHIMP_COMMUNICATION_SENDEMAIL_FROM,
          to: process.env.COMMUNICATION_SENDEMAIL_TO,
          subject: 'Station test',
          text: 'Station test',
        },
        { provider }
      );

      expect(typeof result.unwrap().messageId).toBe('string');
    });
  });

  describe('when inputs are invalid', () => {
    it('should throw error on unwrap', async () => {
      const result = await profile.useCases.SendEmail.perform(
        {
          to: 'invalidemail',
          from: 'invalidemail',
          subject: '',
          text: '',
        },
        { provider }
      );

      try {
        result.unwrap();

        // To ensure test continues in catch branch even if unwrap doesn't throw
        throw new Error('Unwrap should throw');
      } catch (error) {
        expect(error).toBeInstanceOf(MappedHTTPError);
        expect(error.properties.title).toBe('Invalid inputs');
      }
    });
  });
});
