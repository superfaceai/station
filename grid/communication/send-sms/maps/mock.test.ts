import { SuperfaceClient } from '@superfaceai/one-sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;

describe('communication/send-sms/mock', () => {
  it('sends a message', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-sms');
    const provider = await client.getProvider('mock');
    const result = await profile
      .getUseCase('SendMessage')
      .perform({ to: recipient, text: 'Hello world!' }, { provider });
    expect(result.isOk()).toBeTruthy();
    expect(typeof (result.unwrap() as any).messageId).toBe('string');
  });

  it('retrieves message status', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-sms');
    const provider = await client.getProvider('mock');
    const result = await profile
      .getUseCase('RetrieveMessageStatus')
      .perform({ messageId: '1234' }, { provider });
    expect(result.isOk()).toBeTruthy();
    expect(typeof (result.unwrap() as any).deliveryStatus).toBe('string');
  });
});
