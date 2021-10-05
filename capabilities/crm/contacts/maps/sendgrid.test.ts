import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`crm/contacts/sendgrid`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('Create', () => {
    it('should return error if email is missing', async () => {
      await expect(
        superface.run({
          profile: 'crm/contacts',
          provider: 'sendgrid',
          useCase: 'Create',
          input: {},
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'crm/contacts',
          provider: 'sendgrid',
          useCase: 'Create',
          input: {
            email: 'TEST@example.com',
            customProperties: {
              e1_T: 'value',
            },
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
