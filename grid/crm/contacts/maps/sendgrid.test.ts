import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`crm/contacts/sendgrid`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'crm/contacts',
      provider: 'sendgrid',
    });
  });

  describe('Create', () => {
    it('should return error if email is missing', async () => {
      await expect(
        superface.run({
          useCase: 'Create',
          input: {},
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
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
          useCase: 'Update',
          input: {},
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run({
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
          useCase: 'Search',
          input: {
            property: 'firstName',
            operator: 'EQ',
            value: 'test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
