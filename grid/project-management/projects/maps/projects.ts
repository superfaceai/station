/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const createProjectTest = (provider: string): void => {
  describe(`project-management/projects/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
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
