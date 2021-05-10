import { SuperfaceClient } from '../../../../superface/sdk';

describe('fintech/exchange-rate/fixer-typed', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('fintech/exchange-rate');
    const provider = await client.getProvider('fixer');
    const usecase = profile.useCases.GetRates;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform({
      from: 'EUR',
      to: ['USD', 'CAD', 'EUR'],
      date: '2021-01-01'
    }, { provider });
    expect(result.unwrap()).toEqual({
      'base': 'EUR',
      'date': '2021-01-01',
      'rates': [
        {
          'key': 'USD',
          'value': 1.217576,
        },
        {
          'key': 'CAD',
          'value': 1.551131,
        },
        {
          'key': 'EUR',
          'value': 1,
        },
      ],
    });
  });
});