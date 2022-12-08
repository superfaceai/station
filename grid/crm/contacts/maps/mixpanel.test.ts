import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`crm/contacts/mixpanel`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'crm/contacts',
      provider: 'mixpanel',
    });
  });

  describe('Create', () => {
    it('returns Mapped error with unsupported title', async () => {
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
    it('returns error if id is missing', async () => {
      await expect(
        superface.run({
          useCase: 'Update',
          input: {
            email: 'test@example.com',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('performs successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Update',
          input: {
            id: 'user_1',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            customProperties: {
              Source: 'sfc.is',
              $ip: '0',
              $city: 'Prague',
            },
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('Search', () => {
    it('returns Mapped error with unsupported title', async () => {
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
