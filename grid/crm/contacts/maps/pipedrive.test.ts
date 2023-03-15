import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('crm/contracts/pipedrive', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'crm/contacts',
      provider: 'pipedrive',
    });
  });

  describe('Create', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Create',
          input: {
            email: 'test@bshdo.co',
            phone: '+111',
            firstName: 'Test',
            lastName: 'Gvoka',
            company: 'Test Bushido'
          },
        })
      ).resolves.toMatchSnapshot();
    });
  })

  describe('Search', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'Search',
          input: {
            property: 'firstName',
            operator: 'EQ',
            value: 'Benj',
          },
        })
      ).resolves.toMatchSnapshot();
    });

    it('should perform unsuccessfully', async () => {
      await expect(
        superface.run({
          useCase: 'Search',
          input: {
            property: 'randomField',
            operator: 'EQ',
            value: 'Benj',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

})
