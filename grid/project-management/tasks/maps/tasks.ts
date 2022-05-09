/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

export const createTaskTest = (
  provider: string,
  params: {
    title: string;
    project: string;
    parent?: string;
    assignee?: string;
  }
): void => {
  describe(`project-management/tasks/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest({
        profile: 'project-management/tasks',
        provider,
      });
    });

    describe('CreateTask', () => {
      describe('when all inputs are correct', () => {
        it('should create a task', async () => {
          const result = await superface.run({
            useCase: 'CreateTask',
            input: params,
          });
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
