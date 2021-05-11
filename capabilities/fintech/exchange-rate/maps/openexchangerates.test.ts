import { SuperfaceClient } from '../../../../superface/sdk';

describe('fintech/exchange-rate/openexchangerates-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('fintech/exchange-rate');
    const provider = await client.getProvider('openexchangerates');
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
      'date': 1609545590,
      'rates': [
        {
          'key': 'CAD',
          'value': 1.272993,
        },
        {
          'key': 'EUR',
          'value': 0.822681,
        },
        {
          'key': 'USD',
          'value': 1,
        },
      ],
    });
  });
});