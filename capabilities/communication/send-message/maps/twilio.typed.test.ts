import { SuperfaceClient } from '../../../../superface/sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;

describe('communication/send-message/twilio', () => {
  it('sends a message', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-message');
    const provider = await client.getProvider('twilio');
    const result = await profile.useCases.SendMessage.perform(
      { to: recipient, text: 'blabla' },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().messageId).toBe('string');
  });
});
