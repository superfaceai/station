/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';
import { RecordingType } from '@superfaceai/testing/dist/nock/recording.interfaces';

import { buildSuperfaceTest } from '../../../test-config';

const demoAccountParams: {
  [key: string]: { projectIds: string[]; assigneeId: string };
} = {
  asana: {
    projectIds: ['1204486079660998'],
    assigneeId: '1203400162064099',
  },
  'atlassian-cloud': {
    projectIds: ['10000'],
    assigneeId: '6270f8636a38370069dd2345',
  },
};

const createTask = async (
  provider: string,
  input: {
    title?: string;
    projectIds?: string[];
    parent?: string;
    assignee?: string;
    description?: string;
  },
  testName: string
): Promise<string> => {
  const superface = buildSuperfaceTest({
    profile: 'project-management/tasks',
    provider,
    useCase: 'CreateTask',
  });

  const result = await superface.run(
    {
      input: {
        title: input.title ?? 'Test Title',
        projectIds: input.projectIds ?? demoAccountParams[provider]?.projectIds,
        assignee: input.assignee ?? demoAccountParams[provider]?.assigneeId,
        parent: input.parent,
        description: input.description ?? 'Task description',
      },
      testName,
    },
    { recordingType: RecordingType.PREPARE }
  );

  return (result.unwrap() as { taskId: string }).taskId;
};

const deleteTask = async (
  provider: string,
  input: { taskId: string },
  testName: string
): Promise<unknown> => {
  const superface = buildSuperfaceTest({
    profile: 'project-management/tasks',
    provider,
    useCase: 'DeleteTask',
  });

  const result = await superface.run(
    { input, testName },
    { hideInput: ['taskId'], recordingType: RecordingType.TEARDOWN }
  );

  return result.unwrap();
};

export const taskCrudTest = (provider: string): void => {
  describe(`project-management/tasks/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeAll(() => {
      superface = buildSuperfaceTest({
        profile: 'project-management/tasks',
        provider,
      });
    });

    describe('CreateTask', () => {
      describe('when all inputs are correct', () => {
        it('should create a task', async () => {
          const result = await superface.run({
            useCase: 'CreateTask',
            input: {
              title: 'Hello, World!',
              description: 'Description of test task',
              projectIds: demoAccountParams[provider].projectIds,
              assignee: demoAccountParams[provider].assigneeId,
            },
          });

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();

          await deleteTask(
            provider,
            {
              taskId: (result.unwrap() as { taskId: string }).taskId,
            },
            'teardown-CreateTask-DeleteTask'
          );
        });
      });
    });

    describe('ListTasks', () => {
      const ids: string[] = [];

      beforeEach(async () => {
        for (const i of [1, 2, 3]) {
          ids.push(
            await createTask(
              provider,
              { title: `Test ${i}` },
              `prepare-ListTasks-CreateTask-${i}`
            )
          );
        }
      });

      afterEach(async () => {
        for (const i of [1, 2, 3]) {
          await deleteTask(
            provider,
            { taskId: ids[i - 1] },
            `teardown-ListTasks-DeleteTask-${i}`
          );
        }
      });

      describe('when all inputs are correct', () => {
        it('should read all tasks for specified project', async () => {
          for (const projectId of demoAccountParams[provider].projectIds) {
            const result = await superface.run({
              useCase: 'ListTasks',
              input: {
                projectId,
              },
            });

            expect(() => result.unwrap()).not.toThrow();
            expect(result).toMatchSnapshot();
          }
        });
      });
    });

    describe('ReadTask', () => {
      let taskId: string | undefined;

      beforeEach(async () => {
        taskId = await createTask(
          provider,
          { title: 'Test' },
          'prepare-ReadTask-CreateTask'
        );
      });

      afterEach(async () => {
        if (taskId === undefined) {
          throw new Error('Task id is undefined');
        }

        await deleteTask(provider, { taskId }, 'teardown-ReadTask-DeleteTask');
      });

      describe('when all inputs are correct', () => {
        it('should read task specified by id', async () => {
          const result = await superface.run(
            {
              useCase: 'ReadTask',
              input: {
                taskId,
              },
            },
            { hideInput: ['taskId'] }
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });

    describe('UpdateTask', () => {
      let taskId: string | undefined;

      beforeEach(async () => {
        taskId = await createTask(
          provider,
          { title: 'Test' },
          'prepare-UpdateTask-CreateTask'
        );
      });

      afterEach(async () => {
        if (taskId === undefined) {
          throw new Error('Task id is not found');
        }

        await deleteTask(
          provider,
          { taskId },
          'teardown-UpdateTask-DeleteTask'
        );
      });

      describe('when all inputs are correct', () => {
        it('should update a task', async () => {
          const result = await superface.run(
            {
              useCase: 'UpdateTask',
              input: {
                taskId,
                title: 'Hello, World!',
                description: 'Description of test task',
              },
            },
            { hideInput: ['taskId'] }
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });

    describe('DeleteTask', () => {
      let taskId: string | undefined;

      beforeEach(async () => {
        taskId = await createTask(
          provider,
          { title: 'Test' },
          'prepare-DeleteTask-CreateTask'
        );
      });

      describe('when all inputs are correct', () => {
        it('should delete a task', async () => {
          if (taskId === undefined) {
            throw new Error('Task id is not found');
          }

          const result = await superface.run(
            {
              useCase: 'DeleteTask',
              input: {
                taskId,
              },
            },
            { hideInput: ['taskId'] }
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
