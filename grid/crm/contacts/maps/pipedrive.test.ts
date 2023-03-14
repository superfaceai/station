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
  });

  describe('Search', () => {
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
