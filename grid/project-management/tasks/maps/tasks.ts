/* eslint-disable jest/no-export */

import { SuperfaceTest } from '@superfaceai/testing';

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
  const superface = new SuperfaceTest({
    profile: 'project-management/tasks',
    provider,
    useCase: 'CreateTask',
  });

  const result = await superface.run({
    input: {
      title: input.title ?? 'Test Title',
      project: input.project ?? '1203384186840261',
      assignee: input.assignee ?? '1203384186605863',
      parent: input.parent,
      description: input.description ?? 'Task description',
    },
    testName,
  });

  return (result.unwrap() as { id: string }).id;
};

const deleteTask = async (
  provider: string,
  input: { id: string },
  testName: string
): Promise<unknown> => {
  const superface = new SuperfaceTest({
    profile: 'project-management/tasks',
    provider,
    useCase: 'DeleteTask',
  });

  const result = await superface.run({ input, testName });

  return result.unwrap();
};

export const createTaskTest = (
  provider: string,
  params: {
    title: string;
    project: string;
    parent?: string;
    assignee?: string;
    description?: string;
  }
): void => {
  describe(`project-management/tasks/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeAll(() => {
      jest.setTimeout(10000);

      superface = new SuperfaceTest({
        profile: 'project-management/tasks',
        provider,
        useCase: 'CreateTask',
      });
    });

    describe('CreateTask', () => {
      describe('when all inputs are correct', () => {
        it('should create a task', async () => {
          const result = await superface.run({
            input: params,
          });

          expect(result).toMatchSnapshot();
          expect(result.isOk()).toBeTruthy();

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
  });
};

export const readAllTasksTest = (
  provider: string,
  params: {
    projectId: string;
  }
): void => {
  describe(`project-management/tasks/${provider}`, () => {
    const ids: string[] = [];
    let superface: SuperfaceTest;

    beforeAll(() => {
      jest.setTimeout(10000);

      superface = new SuperfaceTest({
        profile: 'project-management/tasks',
        provider,
        useCase: 'ReadAllTasks',
      });
    });

    beforeEach(async () => {
      for (const i of [1, 2, 3]) {
        ids.push(
          await createTask(
            provider,
            { title: `Test ${i}` },
            `prepare-ReadAllTasks-CreateTask-${i}`
          )
        );
      }
    });

    afterEach(async () => {
      for (const i of [1, 2, 3]) {
        await deleteTask(
          provider,
          { id: ids[i - 1] },
          `teardown-ReadAllTasks-DeleteTask-${i}`
        );
      }
    });

    describe('ReadAllTasks', () => {
      describe('when all inputs are correct', () => {
        it('should read all tasks for specified project', async () => {
          const result = await superface.run({
            input: {
              id: params.projectId,
            },
          });

          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};

export const readTaskTest = (provider: string): void => {
  describe(`project-management/tasks/${provider}`, () => {
    let superface: SuperfaceTest;
    let id: string | undefined;

    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'project-management/tasks',
        provider,
        useCase: 'ReadTask',
      });
    });

    beforeEach(async () => {
      id = await createTask(
        provider,
        { title: 'Test' },
        'prepare-ReadTask-CreateTask'
      );
    });

    afterEach(async () => {
      if (id === undefined) {
        throw new Error('Task id is not found');
      }

      await deleteTask(provider, { id }, 'teardown-ReadTask-DeleteTask');
    });

    describe('ReadTask', () => {
      describe('when all inputs are correct', () => {
        it('should read task specified by id', async () => {
          const result = await superface.run({
            input: {
              id,
            },
          });

          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};

export const updateTaskTest = (
  provider: string,
  params: {
    title: string;
    description: string;
  }
): void => {
  describe(`project-management/tasks/${provider}`, () => {
    let superface: SuperfaceTest;
    let id: string | undefined;

    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'project-management/tasks',
        provider,
        useCase: 'UpdateTask',
      });
    });

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

    describe('UpdateTask', () => {
      describe('when all inputs are correct', () => {
        it('should update a task', async () => {
          const result = await superface.run({
            input: {
              id,
              title: params.title,
              description: params.description,
            },
          });

          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};

export const deleteTaskTest = (provider: string): void => {
  describe(`project-management/tasks/${provider}`, () => {
    let superface: SuperfaceTest;
    let id: string | undefined;

    beforeAll(() => {
      superface = new SuperfaceTest({
        profile: 'project-management/tasks',
        provider,
        useCase: 'DeleteTask',
      });
    });

    beforeEach(async () => {
      id = await createTask(
        provider,
        { title: 'Test' },
        'prepare-DeleteTask-CreateTask'
      );
    });

    describe('DeleteTask', () => {
      describe('when all inputs are correct', () => {
        it('should delete a task', async () => {
          if (id === undefined) {
            throw new Error('Task id is not found');
          }

          const result = await superface.run({
            input: {
              id,
            },
          });

          expect(result).toMatchSnapshot();
        });
      });
    });
  });
};
