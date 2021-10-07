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

  describe('Update', () => {
    it('should return error if email is missing', async () => {
      await expect(
        superface.run({
          profile: 'crm/contacts',
          provider: 'sendgrid',
          useCase: 'Update',
          input: {},
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'crm/contacts',
          provider: 'sendgrid',
          useCase: 'Update',
          input: {
            id: 'test@example.com',
            firstName: 'test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('Search', () => {
    it('should return error if unknow operator is used', async () => {
      await expect(
        superface.run({
          profile: 'crm/contacts',
          provider: 'sendgrid',
          useCase: 'Search',
          input: {
            property: 'firstName',
            operator: '%',
            value: 'test',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'crm/contacts',
          provider: 'sendgrid',
          useCase: 'Search',
          input: {
            property: 'firstName',
            operator: '=',
            value: 'test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
