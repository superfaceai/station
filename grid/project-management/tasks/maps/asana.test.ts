import {
  createTaskTest,
  deleteTaskTest,
  readAllTasksTest,
  readTaskTest,
  updateTaskTest,
} from './tasks';

const providerName = 'asana';

createTaskTest(providerName, {
  title: 'Hello, World!',
  project: '1203384186840261',
  assignee: '1203384186605863',
  description: 'Description of test task',
});

readAllTasksTest(providerName, {
  projectId: '1203384186840261',
});

readTaskTest(providerName);

updateTaskTest(providerName, {
  title: 'Test Task',
  description: 'Description of test task',
});

deleteTaskTest(providerName);
