import { SuperfaceClient } from '@superfaceai/one-sdk';
import nock from 'nock';
const {
  API_RESPONSE,
  EXPECTED_PRODUCT,
  API_RESPONSE_ERROR,
  EXPECTED_ERROR,
} = require('./fixtures/shopify.fixture');

function mockApiCall(body: object, status = 200) {
  nock(`https://${process.env.SHOPIFY_SHOP_DOMAIN}.myshopify.com`)
    .post('/api/2021-04/graphql.json')
    .reply(status, body);
}

describe('storefront/product', () => {
  const id = EXPECTED_PRODUCT.id;

  afterEach(nock.cleanAll);

  describe(`given a product on Shopify with identifier '${id}'`, () => {
    it(`when retrieving a product with ID '${id}' • retrieves a Product`, async () => {
      mockApiCall(API_RESPONSE);
      const client = new SuperfaceClient();
      const profile = await client.getProfile('storefront/product');
      const useCase = profile.getUseCase('RetrieveProduct');
      const provider = await client.getProvider('shopify');
      const result = await useCase.perform({ id }, { provider });

      const product = result.unwrap();
      expect(product).toStrictEqual(EXPECTED_PRODUCT);
    });

    it(`when retrieving a product with unknown identifier • results in an error`, async () => {
      mockApiCall(API_RESPONSE_ERROR);
      const client = new SuperfaceClient();
      const profile = await client.getProfile('storefront/product');
      const useCase = profile.getUseCase('RetrieveProduct');
      const provider = await client.getProvider('shopify');
      const result = await useCase.perform({ id: 'random-id' }, { provider });

      expect((result as any).error.properties).toStrictEqual(EXPECTED_ERROR);
    });
  });
});
