import { getMessagesTest } from './messages';

const dest1 = {
  channel: '938614740995960844',
  thread: '940583259262308362',
};

const dest2 = {
  channel: '000000000000000000',
  thread: '000000000000000000',
};

getMessagesTest('discord', [dest1, dest2]);
