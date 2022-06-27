import { getMessagesTest } from './messages';

const dest1 = {
  channel: 'CF3H7S63W',
  thread: '1643835555.648069',
};

const dest2 = {
  channel: 'not-existing-dest',
  thread: 'not-existing-thread-dest',
};

getMessagesTest('slack', [dest1, dest2]);
