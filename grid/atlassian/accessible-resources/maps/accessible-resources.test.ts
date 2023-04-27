import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe(`atlassian/accessible-resources`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = buildSuperfaceTest({
      profile: 'atlassian/accessible-resources',
      provider: 'atlassian-cloud',
    });
  });

  describe('ListAccessibleResources', () => {
    describe('the usecase without any parameters', () => {
      it('should list all resources', async () => {
        const result = await superface.run({
          useCase: 'ListAccessibleResources',
          input: {},
        });
        expect(() => result.unwrap()).not.toThrow();
        expect(result).toMatchSnapshot();
      });
    });
  });
});
