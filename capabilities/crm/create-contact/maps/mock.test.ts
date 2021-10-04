import { SuperfaceClient } from '@superfaceai/one-sdk';

describe(`crm/create-contact/mock`, () => {
  let superface: SuperfaceClient;

  beforeEach(() => {
    superface = new SuperfaceClient();
  });

  describe('UseCase', () => {
    it('should perform successfully', async () => {
      const profile = await superface.getProfile('crm/create-contact');
      const provider = await superface.getProvider('mock');

      const result = await profile
        .getUseCase('CreateContact')
        .perform({ email: 'test@example.com' }, { provider });

      expect(result.unwrap()).toEqual({ id: 'mocked@example.com' });
    });
  });
});
