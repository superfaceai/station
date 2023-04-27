import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

describe('project-management/tasks/mock', () => {
  let superface: SuperfaceTest;

  beforeAll(() => {
    superface = buildSuperfaceTest({
      profile: 'project-management/tasks',
      provider: 'mock',
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
            project: 'PROJECT_ID',
            assignee: 'ASSIGNEE_ID',
          },
        });

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('ListTasks', () => {
    describe('when all inputs are correct', () => {
      it('should read all tasks for specified project', async () => {
        const result = await superface.run({
          useCase: 'ListTasks',
          input: {
            projectId: 'PROJECT_ID',
          },
        });

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('ReadTask', () => {
    describe('when all inputs are correct', () => {
      it('should read task specified by id', async () => {
        const result = await superface.run({
          useCase: 'ReadTask',
          input: {
            taskId: 'TASK_ID',
          },
        });

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('UpdateTask', () => {
    describe('when all inputs are correct', () => {
      it('should update a task', async () => {
        const result = await superface.run({
          useCase: 'UpdateTask',
          input: {
            taskId: 'TASK_ID',
            title: 'Hello, World!',
            description: 'Description of test task',
          },
        });

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('DeleteTask', () => {
    describe('when all inputs are correct', () => {
      it('should delete a task', async () => {
        const result = await superface.run({
          useCase: 'DeleteTask',
          input: {
            taskId: 'TASK_ID',
          },
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
