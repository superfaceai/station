import { getMessagesTest } from './messages';

/**
 * Live tests
 *
 * @group live/safe
 */

getMessagesTest('slack', ['C03UL8E5YMR', 'not-existing-dest']);
