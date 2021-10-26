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
        .perform({ email: 'john@example.com' }, { provider });

      expect(result.unwrap()).toEqual({ id: 'john@example.com' });
    });
  });

  describe('Update', () => {
    it('should perform successfully', async () => {
      const profile = await superface.getProfile('crm/contacts');
      const provider = await superface.getProvider('mock');

      const result = await profile
        .getUseCase('Update')
        .perform(
          { id: 'john.old@example.com', email: 'john@example.com' },
          { provider }
        );

      expect(result.unwrap()).toEqual({ id: 'john@example.com' });
    });
  });

  describe('Search', () => {
    it('should perform successfully', async () => {
      const profile = await superface.getProfile('crm/contacts');
      const provider = await superface.getProvider('mock');

      const result = await profile
        .getUseCase('Search')
        .perform(
          { property: 'company', operator: 'EQ', value: 'Example' },
          { provider }
        );

      const contacts = result.unwrap() as any[];

      expect(Array.isArray(contacts)).toBeTruthy();
      expect(contacts).toHaveLength(2);
      expect(contacts[0]).toEqual({
        id: 'john@example.com',
        email: 'john@example.com',
        phone: '+420 123 456 789',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Example',
        country: 'Czech republic',
        customProperties: {
          waitlist: true,
        },
      });
    });
  });
});
