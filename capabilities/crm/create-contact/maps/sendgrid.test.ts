import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`crm/create-contact/sendgrid`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('CreateContact', () => {
    it('should return error if email is missing', async () => {
      await expect(
        superface.run({
          profile: 'crm/create-contact',
          provider: 'sendgrid',
          useCase: 'CreateContact',
          input: {},
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'crm/create-contact',
          provider: 'sendgrid',
          useCase: 'CreateContact',
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
