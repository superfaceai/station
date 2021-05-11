import { SuperfaceClient } from '../../../../superface/sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;

describe('communication/send-message/mock', () => {
  it('sends a message', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-message');
    const provider = await client.getProvider('mock');
    const result = await profile.useCases.SendMessage.perform(
      { to: recipient, text: 'Hello world!' },
      { provider }
    );
    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().messageId).toBe('string');
  });

  it('retrieves message status', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-message');
    const provider = await client.getProvider('mock');
    const result = await profile.useCases.RetrieveMessageStatus.perform(
      { messageId: "1234"},
      { provider }
    );
    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().deliveryStatus).toBe("string")
  });  
});
