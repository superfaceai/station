import { SuperfaceTest } from '@superfaceai/testing';

describe(`crm/contacts/hubspot`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'crm/contacts',
      provider: 'hubspot',
      testInstance: expect,
    });
  });

  describe('Create', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
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

  describe('Update', () => {
    it('should return error if id is missing', async () => {
      await expect(
        superface.run({
          useCase: 'Update',
          input: {
            email: 'test@example.com',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Update',
          input: {
            id: '401',
            firstName: 'Updated first name',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('Search', () => {
    it('should return error for unknown operator', async () => {
      await expect(
        superface.run({
          useCase: 'Search',
          input: {
            property: 'firstname',
            operator: '%',
            value: 'John',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Search',
          input: {
            property: 'firstname',
            operator: 'EQ',
            value: 'Test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
