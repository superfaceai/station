import { getMessagesTest } from './messages';

/**
 * Live tests
 *
 * @group live/safe
 */

getMessagesTest('slack', {
  valid: 'C03UL8E5YMR',
  invalid: 'not-existing-dest',
});
