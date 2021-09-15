/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-export */

import { MappedHTTPError, Provider } from '@superfaceai/one-sdk';

import {
  CommunicationSendTemplatedEmailProfile,
  SuperfaceClient,
} from '../../../../superface/sdk';

export const sendTemplatedEmailTest = (providerName: string): void => {
  describe(`communication/send-templated-email/${providerName}`, () => {
    let client: InstanceType<typeof SuperfaceClient>;
    let profile: CommunicationSendTemplatedEmailProfile;
    let provider: Provider;

    beforeEach(async () => {
      client = new SuperfaceClient();
      profile = await client.getProfile('communication/send-templated-email');
      provider = await client.getProvider(providerName);
    });

    it('should find provider', async () => {
      expect(provider).not.toBeUndefined();
    });

    describe('SendTemplatedEmail', () => {
      describe('when all inputs are correct', () => {
        it('should return messagaId as result', async () => {
          const result = await profile.useCases.SendTemplatedEmail.perform(
            {
              from:
                process.env[
                  `${providerName.toUpperCase()}_COMMUNICATION_SENDEMAIL_FROM`
                ],
              to: process.env.COMMUNICATION_SENDEMAIL_TO,
              templateId:
                process.env[
                  `${providerName.toUpperCase()}_COMMUNICATION_SENDEMAIL_TEMPLATE_ID`
                ],
              templateData: {
                from:
                  process.env[
                    `${providerName.toUpperCase()}_COMMUNICATION_SENDEMAIL_FROM`
                  ],
                to: process.env.COMMUNICATION_SENDEMAIL_TO,
              },
            },
            { provider }
          );

          expect(typeof result.unwrap().messageId).toBe('string');
        });
      });

      describe('when inputs are invalid', () => {
        it('should throw error on unwrap', async () => {
          const result = await profile.useCases.SendTemplatedEmail.perform(
            {
              to: 'invalidemail',
              from: 'invalidemail',
              templateId: 'invalid',
              templateData: null,
            },
            { provider }
          );

          try {
            result.unwrap();
            throw new Error('must throw something');
          } catch (error) {
            expect(error).toBeInstanceOf(MappedHTTPError);
            expect(error.properties.title).toBe('Invalid inputs');
          }
        });
      });
    });
  });
};
