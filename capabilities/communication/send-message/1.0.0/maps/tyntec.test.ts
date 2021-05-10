import { Provider, TypedProfile } from '@superfaceai/one-sdk';

import { SuperfaceClient } from '../superface/sdk';
import {
  RetrieveMessageStatusInput,
  RetrieveMessageStatusResult,
  SendMessageInput,
  SendMessageResult,
} from '../superface/types/communication';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO;
let profile: TypedProfile<{
  SendMessage: [SendMessageInput, SendMessageResult];
  RetrieveMessageStatus: [
    RetrieveMessageStatusInput,
    RetrieveMessageStatusResult
  ];
}>;
let provider: Provider;
describe('communication/send-message/1.0.0/tyntec-typed', () => {
  //Load super.json for tested usecase
  beforeAll(async () => {
    process.env.SUPERFACE_PATH =
      './capabilities/communication/send-message/1.0.0/superface/super.json';
    const client = new SuperfaceClient();
    profile = await client.getProfile('communication/send-message');
    provider = await client.getProvider('tyntec');
  });

  it('sends a message', async () => {
    const useCase = profile.getUseCase('SendMessage');
    const result = await useCase.perform(
      { to: recipient, from: 'tyntec', text: 'Hello World!' },
      { provider }
    );
    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().messageId).toBe('string');
  });

  it('retrieves message status', async () => {
    const sendMessageUseCase = profile.getUseCase('SendMessage');
    const sendMessageResult = await sendMessageUseCase.perform(
      { to: recipient, from: 'tyntec', text: 'Hello World!' },
      { provider }
    );
    const messageId = sendMessageResult.unwrap().messageId;

    const useCase = profile.getUseCase('RetrieveMessageStatus');
    const result = await useCase.perform({ messageId }, { provider });

    // if (result.isErr()) {
    //   console.log('error', result.error)
    // }

    expect(result.isOk()).toBeTruthy();
    expect(typeof result.unwrap().deliveryStatus).toBe('string');
  });
});
