import { SuperfaceClient } from '../superface/sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;

describe('communication/send-message/1.0.0/twilio-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/communication/send-message/1.0.0/superface/super.json';
  });

  it('performs correctly', async () => {
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
