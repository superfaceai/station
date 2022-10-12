import { sendMessageTest } from './send-message';

/**
 * Live tests
 *
 * @group live/safe
 */

sendMessageTest('slack', ['CF3H7S63W', 'not-existing-dest']);
