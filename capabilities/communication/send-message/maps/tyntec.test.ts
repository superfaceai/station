import { SuperfaceClient } from '@superfaceai/sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO
let profile: any;
let provider: any;

describe('communication/send-message/tyntec', () => {
  beforeAll(async () => {
    const client = new SuperfaceClient;
    profile = await client.getProfile('communication/send-message');
    provider = await client.getProvider('tyntec');
  })

  it('sends a message', async () => {
    const useCase = profile.getUseCase('SendMessage');
    const result = await useCase.perform({ to: recipient, from: 'tyntec', text: 'Hello World!' }, { provider });
    expect(result.isOk()).toBeTruthy();
    expect(typeof(result.unwrap() as any).messageId).toBe('string');
  });
  
  it('retrieves message status', async () => {
    const sendMessageUseCase = profile.getUseCase('SendMessage');
    const sendMessageResult = await sendMessageUseCase.perform({ to: recipient, from: 'tyntec', text: 'Hello World!' }, { provider });
    const messageId = sendMessageResult.unwrap().messageId;

    const useCase = profile.getUseCase('RetrieveMessageStatus');
    const result = await useCase.perform({ messageId: messageId }, { provider });

    // if (result.isErr()) {
    //   console.log('error', result.error)
    // }
    
    expect(result.isOk()).toBeTruthy();
    expect(typeof(result.unwrap() as any).deliveryStatus).toBe('string');
  });
})
