import { getMessagesTest } from './messages';

/**
 * Live tests
 *
 * @group live/safe
 */

getMessagesTest('discord', {
  valid: '938614740995960844',
  invalid: '000000000000000000',
});
