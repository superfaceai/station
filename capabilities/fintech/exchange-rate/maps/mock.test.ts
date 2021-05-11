import { SuperfaceClient } from '../../../../superface/sdk';

describe('fintech/exchange-rate/mock-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('fintech/exchange-rate');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.GetRates;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform({
      from: 'USD',
      to: ['USD', 'CAD', 'EUR'],
      date: '2021-01-01'
    }, { provider });
    expect(result.unwrap()).toEqual({
      'base': 'USD',
      'date': '2021-01-01',
      'rates': [
        {
          'key': 'CZK',
          'value': 1.2,
        },
        {
          'key': 'USD',
          'value': 2.3,
        },
        {
          'key': 'EUR',
          'value': 3.4,
        },
      ],
    });
  });
});