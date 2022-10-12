import { deleteMessageTest } from './delete-message';

/**
 * Live tests
 *
 * @group live/safe
 */

deleteMessageTest(
  'slack',
  {
    valid: 'C03UL8E5YMR',
    invalid: 'not-existing-dest',
  },
  'not-existing-id'
);
