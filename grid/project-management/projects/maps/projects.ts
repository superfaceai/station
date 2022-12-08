/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export const createProjectTest = (provider: string): void => {
  describe(`project-management/projects/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'project-management/projects',
        provider,
      });
    });

    describe('ListProject', () => {
      describe('the usecase without any parameters', () => {
        it('should list all projects', async () => {
          const result = await superface.run({
            useCase: 'ListProjects',
            input: {},
          });
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
