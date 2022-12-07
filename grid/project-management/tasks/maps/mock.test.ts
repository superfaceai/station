import { SuperfaceTest } from '@superfaceai/testing';

describe('project-management/tasks/mock', () => {
  let superface: SuperfaceTest;

  beforeAll(() => {
    superface = new SuperfaceTest({
      profile: 'project-management/tasks',
      provider: 'mock',
      testInstance: expect,
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
            id: 'PROJECT_ID',
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
            id: 'TASK_ID',
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
            id: 'TASK_ID',
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
            id: 'TASK_ID',
          },
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
