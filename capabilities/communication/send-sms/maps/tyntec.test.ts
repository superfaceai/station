import { Profile, Provider, SuperfaceClient } from '@superfaceai/one-sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;
let profile: Profile;
let provider: Provider;

describe('communication/send-sms/tyntec', () => {
  beforeAll(async () => {
    const client = new SuperfaceClient();
    profile = await client.getProfile('communication/send-sms');
    provider = await client.getProvider('tyntec');
  });

  it('sends a message', async () => {
    const useCase = profile.getUseCase('SendMessage');
    const result = await useCase.perform<any, { messageId: string }>(
      { to: recipient, from: 'tyntec', text: 'Hello World!' },
      { provider }
    );
    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().messageId).toBe('string');
  });

  it('retrieves message status', async () => {
    const sendMessageUseCase = profile.getUseCase('SendMessage');
    const sendMessageResult = await sendMessageUseCase.perform<
      any,
      { messageId: string }
    >({ to: recipient, from: 'tyntec', text: 'Hello World!' }, { provider });
    const messageId = sendMessageResult.unwrap().messageId;

    const useCase = profile.getUseCase('RetrieveMessageStatus');
    const result = await useCase.perform<
      { messageId: string },
      { deliveryStatus: string }
    >({ messageId }, { provider });

    // if (result.isErr()) {
    //   console.log('error', result.error)
    // }

    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().deliveryStatus).toBe('string');
  });
});
