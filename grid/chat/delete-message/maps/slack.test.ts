import { deleteMessageTest } from './delete-message';

/**
 * Live tests
 *
 * @group live/safe
 */

deleteMessageTest(
  'slack',
  ['C03UL8E5YMR', 'not-existing-dest'],
  'not-existing-id'
);
