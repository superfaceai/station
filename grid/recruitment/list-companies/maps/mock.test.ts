import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('recruitment/list-companies/mock', () => {
  describe('ListCompanies', () => {
    it('performs correctly', async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile('recruitment/list-companies');
      const provider = await client.getProvider('mock');
      const usecase = profile.getUseCase('ListCompanies');

      expect(provider).not.toBeUndefined();
      expect(usecase).not.toBeUndefined();

      const result = await usecase.perform(undefined, { provider });

      expect(result.isOk() && (result.value as any)).toEqual({
        companies: [
          {
            id: '1',
            name: 'Superface',
            description:
              'Superface is technology startup, based in Czech Republic, which connects applications through APIs.',
            createdAt: '2021-01-01T00:00:00.000Z',
            updatedAt: '2021-01-01T00:00:00.000Z',
          },
        ],
      });
    });
  });
});
