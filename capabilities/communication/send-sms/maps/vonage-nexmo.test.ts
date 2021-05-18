import { Profile, Provider, SuperfaceClient } from '@superfaceai/one-sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;
let profile: Profile;
let provider: Provider;

describe('communication/send-sms/vonage-nexmo', () => {
  beforeAll(async () => {
    const client = new SuperfaceClient();
    profile = await client.getProfile('communication/send-sms');
    provider = await client.getProvider('vonage-nexmo');
  });

  it('sends a message', async () => {
    const useCase = profile.getUseCase('SendMessage');
    const result = await useCase.perform<any, { messageId: string }>(
      { to: recipient, from: 'Vonage APIs', text: 'Hello World!' },
      { provider }
    );

    // if (result.isErr()) {
    //   console.log('Error >', result.error);
    // }
    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().messageId).toBe('string');
    // console.log('Result >', result.value)
  });

  it('does not retrieves message status', async () => {
    const useCase = profile.getUseCase('RetrieveMessageStatus');
    const result = await useCase.perform({ messageId: '' }, { provider });

    expect(result.isErr()).toBeTruthy();
  });
});
