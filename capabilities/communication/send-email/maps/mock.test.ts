import { SuperfaceClient } from '../../../../superface/sdk';

describe('communication/send-email/mock-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-email');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.SendEmail;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      {
        from: '',
        to: '',
        subject: '',
        text: '',
      },
      { provider }
    );

    expect(typeof result.unwrap().messageId).toEqual('string');
  });
});
