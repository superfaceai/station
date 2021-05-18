import { Profile, Provider, SuperfaceClient } from '@superfaceai/one-sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;
let profile: Profile;
let provider: Provider;

describe('communication/send-sms/plivo', () => {
  beforeAll(async () => {
    const client = new SuperfaceClient();
    profile = await client.getProfile('communication/send-sms');
    provider = await client.getProvider('plivo');
  });

  it('sends a message', async () => {
    const useCase = profile.getUseCase('SendMessage');
    const result = await useCase.perform<any, { messageId: string }>(
      { to: recipient, from: 'plivotest', text: 'Hello World!' },
      { provider }
    );

    // if (result.isErr()) {
    //   console.log('Error >', result.error);
    // }
    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().messageId).toBe('string');
    // console.log('Result >', result.value)
  });

  it('retrieves message status', async () => {
    const sendMessageUseCase = profile.getUseCase('SendMessage');
    const sendMessageResult = await sendMessageUseCase.perform<
      any,
      { messageId: string }
    >({ to: recipient, from: 'plivotest', text: 'Hello World!' }, { provider });
    const messageId = sendMessageResult.unwrap().messageId;

    const useCase = profile.getUseCase('RetrieveMessageStatus');
    const result = await useCase.perform<any, any>(
      { messageId: messageId },
      { provider }
    );

    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().deliveryStatus).toBe('string');
  });
});
