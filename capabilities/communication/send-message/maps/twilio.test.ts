import { Profile, SuperfaceClient } from '@superfaceai/one-sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;
let profile: Profile;
let provider: any;

describe('communication/send-message/twilio', () => {
  beforeAll(async () => {
    const client = new SuperfaceClient();
    profile = await client.getProfile('communication/send-message');
    provider = await client.getProvider('twilio');
  });

  it('sends a message', async () => {
    const useCase = profile.getUseCase('SendMessage');
    // note: `from` input is configured in super.json
    const result = await useCase.perform(
      { to: recipient, text: 'Hello World!', channel: 'sms' },
      { provider }
    );
    expect(result.isOk()).toBeTruthy();
    expect(typeof (result.unwrap() as any).messageId).toBe('string');
  });

  it('retrieves message status', async () => {
    const sendMessageUseCase = profile.getUseCase('SendMessage');
    const sendMessageResult = await sendMessageUseCase.perform<
      { to: string | undefined; text: string; channel: string },
      { messageId: string }
    >({ to: recipient, text: 'Hello World!', channel: 'sms' }, { provider });
    const messageId = sendMessageResult.unwrap().messageId;

    const useCase = profile.getUseCase('RetrieveMessageStatus');
    const result = await useCase.perform({ messageId }, { provider });

    if (result.isErr()) {
      console.log('error', result.error);
    }
    expect(result.isOk()).toBeTruthy();
    expect(typeof (result.unwrap() as any).deliveryStatus).toBe('string');
  });
});
