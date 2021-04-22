import { SuperfaceClient } from '@superfaceai/sdk';

describe('communication/send-email/sendgrid', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-email');
    const useCase = profile.getUseCase('SendEmail');
    const provider = await client.getProvider('sendgrid');

    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();

    // Edit expected value

    const result = await useCase.perform(
      {
        subject: 'Station test',
        text: 'Station test',
      },
      { provider }
    );

    expect(typeof (result.unwrap() as any).messageId).toBe('string');

    /*
    TS syntax

    try {
      const result = await useCase.perform({}, { provider });
      expect(typeof result.messageId).toBe('string');
    } catch (err) {
      // handle error
    }

    */
  });
});
