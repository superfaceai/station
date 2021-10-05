import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`crm/contacts/hubspot`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('Create', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'crm/contacts',
          provider: 'hubspot',
          useCase: 'Create',
          input: {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            company: 'Station Test',
            country: 'USA',
            customProperties: {
              myproperty: 'value',
            },
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
