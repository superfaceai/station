import { SuperfaceTest } from '@superfaceai/testing';

import { nockConfig } from '../../../test-config';

describe(`crm/contacts/crisp`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest(
      {
        profile: 'crm/contacts',
        provider: 'crisp',
      },
      nockConfig
    );
  });

  describe('Create', () => {
    it('performs successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Create',
          input: {
            email: 'support+station@superface.ai',
            firstName: 'Station Test',
            customProperties: {
              propertyAddedOnCreation: 'field value',
            },
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('returns error if name is missing', async () => {
      await expect(
        superface.run({
          useCase: 'Create',
          input: {
            email: 'support+station@superface.ai',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('Update', () => {
    it('performs successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Update',
          input: {
            email: 'support+station@superface.ai',
            phone: '+420123456789',
            firstName: 'Station Test',
            lastName: 'Support',
            company: 'Superface AI',
            country: 'CZ',
            customProperties: {
              propertyAddedOnUpdate: 'field value',
            },
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('returns error for non existent contact', async () => {
      await expect(
        superface.run({
          useCase: 'Update',
          input: {
            id: '999',
            email: 'nonexistent+user@superface.test',
            phone: '+420123456789',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('Search', () => {
    it('performs successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Search',
          input: {
            property: 'email',
            operator: 'EQ',
            value: 'support+station@superface.ai',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('performs successfully for contacts without name', async () => {
      await expect(
        superface.run({
          useCase: 'Search',
          input: {
            property: 'email',
            operator: 'EQ',
            value: 'support+stationnoname@superface.ai',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('returns error for unknown operator', async () => {
      await expect(
        superface.run({
          useCase: 'Search',
          input: {
            property: 'segments',
            operator: '%',
            value: 'station-test',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
