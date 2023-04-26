/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';
import { RecordingType } from '@superfaceai/testing/dist/nock/recording.interfaces';

import { buildSuperfaceTest } from '../../../test-config';

const demoAccountParams = {
  projectId: '1203400042224704',
  profileId: '1203400162064099',
};

const createTask = async (
  provider: string,
  input: {
    title?: string;
    project?: string;
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
        project: input.project ?? demoAccountParams.projectId,
        assignee: input.assignee ?? demoAccountParams.profileId,
        parent: input.parent,
        description: input.description ?? 'Task description',
      },
      testName,
    },
    { recordingType: RecordingType.PREPARE }
  );

  return (result.unwrap() as { id: string }).id;
};

const deleteTask = async (
  provider: string,
  input: { id: string },
  testName: string
): Promise<unknown> => {
  const superface = buildSuperfaceTest({
    profile: 'project-management/tasks',
    provider,
    useCase: 'DeleteTask',
  });

  const result = await superface.run(
    { input, testName },
    { hideInput: ['id'], recordingType: RecordingType.TEARDOWN }
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
              project: demoAccountParams.projectId,
              assignee: demoAccountParams.profileId,
            },
          });

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();

          await deleteTask(
            provider,
            {
              id: (result.unwrap() as { id: string }).id,
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
            { id: ids[i - 1] },
            `teardown-ListTasks-DeleteTask-${i}`
          );
        }
      });

      describe('when all inputs are correct', () => {
        it('should read all tasks for specified project', async () => {
          const result = await superface.run({
            useCase: 'ListTasks',
            input: {
              id: demoAccountParams.projectId,
            },
          });

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });

    describe('ReadTask', () => {
      let id: string | undefined;

      beforeEach(async () => {
        id = await createTask(
          provider,
          { title: 'Test' },
          'prepare-ReadTask-CreateTask'
        );
      });

      afterEach(async () => {
        if (id === undefined) {
          throw new Error('Task id is undefined');
        }

        await deleteTask(provider, { id }, 'teardown-ReadTask-DeleteTask');
      });

      describe('when all inputs are correct', () => {
        it('should read task specified by id', async () => {
          const result = await superface.run(
            {
              useCase: 'ReadTask',
              input: {
                id,
              },
            },
            { hideInput: ['id'] }
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });

    describe('UpdateTask', () => {
      let id: string | undefined;

      beforeEach(async () => {
        id = await createTask(
          provider,
          { title: 'Test' },
          'prepare-UpdateTask-CreateTask'
        );
      });

      afterEach(async () => {
        if (id === undefined) {
          throw new Error('Task id is not found');
        }

        await deleteTask(provider, { id }, 'teardown-UpdateTask-DeleteTask');
      });

      describe('when all inputs are correct', () => {
        it('should update a task', async () => {
          const result = await superface.run(
            {
              useCase: 'UpdateTask',
              input: {
                id,
                title: 'Hello, World!',
                description: 'Description of test task',
              },
            },
            { hideInput: ['id'] }
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });

    describe('DeleteTask', () => {
      let id: string | undefined;

      beforeEach(async () => {
        id = await createTask(
          provider,
          { title: 'Test' },
          'prepare-DeleteTask-CreateTask'
        );
      });

      describe('when all inputs are correct', () => {
        it('should delete a task', async () => {
          if (id === undefined) {
            throw new Error('Task id is not found');
          }

          const result = await superface.run(
            {
              useCase: 'DeleteTask',
              input: {
                id,
              },
            },
            { hideInput: ['id'] }
          );

          expect(() => result.unwrap()).not.toThrow();
          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
