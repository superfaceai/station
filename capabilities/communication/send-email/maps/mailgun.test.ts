import { SuperfaceClient } from '../../../../superface/sdk';

describe('communication/send-email/mailgun', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-email');
    const useCase = profile.getUseCase('SendEmail');
    const provider = await client.getProvider('mailgun');

    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();

    const result = await useCase.perform(
      {
        from: process.env.MAILGUN_COMMUNICATION_SENDEMAIL_FROM,
        to: process.env.COMMUNICATION_SENDEMAIL_TO,
        subject: 'Station test',
        text: 'Station test',
      },
      { provider }
    );

    expect(typeof result.unwrap().messageId).toEqual('string');
  });
});
