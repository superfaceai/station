import { SuperfaceClient } from '@superfaceai/one-sdk';
const { EXPECTED_PRODUCT } = require('./fixtures/stripe.fixture');

describe('storefront/product', () => {
  const id = EXPECTED_PRODUCT.id;

  it(`when retrieving a product • retrieves at least minimally required params`, async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('storefront/product');
    const useCase = profile.getUseCase('RetrieveProduct');
    const provider = await client.getProvider('stripe');
    const result = await useCase.perform({ id }, { provider });

    const product = result.unwrap();
    expect(typeof (product as any).id).toBe('string');
    expect(typeof (product as any).title).toBe('string');
    expect(typeof (product as any).description).toBe('string');
  });
});
