import { SuperfaceClient } from '../../../../superface/sdk';

describe('communication/send-message/slack', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/send-message');
    const provider = await client.getProvider('slack');
    const usecase = profile.useCases.SendMessage;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      {
        destination: process.env.SLACK_DESTINATION as string,
        text: `Station test ${new Date().toISOString()}`,
      },
      { provider }
    );

    const data = result.unwrap();

    expect(data.destination).toMatch(/c.+/i);
    expect(data.messageId).toMatch(/\d+\.\d+/);
  });
});
