import { SuperfaceClient } from '@superfaceai/one-sdk';
import nock from 'nock';
const {
  API_RESPONSE_PROD,
  API_RESPONSE_PRICES,
  EXPECTED_PRODUCT,
  API_RESPONSE_ERROR,
  EXPECTED_ERROR,
} = require('./fixtures/stripe.fixture');

function mockApiCall(path: string, body: object, status = 200) {
  nock(`https://api.stripe.com`).get(path).reply(status, body);
}

describe('storefront/product', () => {
  const id = EXPECTED_PRODUCT.id;

  afterEach(nock.cleanAll);

  describe(`given a product on Stripe with identifier '${id}'`, () => {
    it(`when retrieving a product with ID '${id}' • retrieves a Product`, async () => {
      mockApiCall(`/v1/products/${id}`, API_RESPONSE_PROD);
      mockApiCall(`/v1/prices?product=${id}&limit=100&`, API_RESPONSE_PRICES);

      const client = new SuperfaceClient();
      const profile = await client.getProfile('storefront/product');
      const useCase = profile.getUseCase('RetrieveProduct');
      const provider = await client.getProvider('stripe');

      const result = await useCase.perform({ id }, { provider });
      const product = result.unwrap();

      expect(product).toEqual(EXPECTED_PRODUCT);
    });

    it(`when retrieving a product with unknown identifier • results in an error`, async () => {
      mockApiCall(`/v1/products/unknown`, API_RESPONSE_ERROR, 404);
      mockApiCall(
        `/v1/prices?product=unknown&limit=100&`,
        API_RESPONSE_ERROR,
        400
      );

      const client = new SuperfaceClient();
      const profile = await client.getProfile('storefront/product');
      const useCase = profile.getUseCase('RetrieveProduct');
      const provider = await client.getProvider('stripe');

      const result = await useCase.perform({ id: 'unknown' }, { provider });

      expect((result as any).error.properties).toStrictEqual(EXPECTED_ERROR);
    });
  });
});
