import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`crm/create-contact.hubspot`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('CreateContact', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'crm/create-contact',
          provider: 'hubspot',
          useCase: 'CreateContact',
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
