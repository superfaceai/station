import { SuperfaceClient } from '../../../../superface/sdk';

describe('communication/email-templates/mock', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('communication/email-templates');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.EmailTemplates;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    //Edit input values and expected result
    //const result = await usecase.perform({}, { provider });
    //expect(result.unwrap()).toEqual();
  });
});
