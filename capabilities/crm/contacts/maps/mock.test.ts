import { SuperfaceClient } from '@superfaceai/one-sdk';

describe(`crm/contacts/mock`, () => {
  let superface: SuperfaceClient;

  beforeEach(() => {
    superface = new SuperfaceClient();
  });

  describe('Create', () => {
    it('should perform successfully', async () => {
      const profile = await superface.getProfile('crm/contacts');
      const provider = await superface.getProvider('mock');

      const result = await profile
        .getUseCase('Create')
        .perform({ email: 'test@example.com' }, { provider });

      expect(result.unwrap()).toEqual({ id: 'mocked@example.com' });
    });
  });
});
