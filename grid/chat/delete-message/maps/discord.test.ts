import { deleteMessageTest } from './delete-message';

/**
 * Live tests
 *
 * @group live/safe
 */

deleteMessageTest(
  'discord',
  {
    valid: '938614740995960844',
    invalid: '000000000000000000',
  },
  '000000000000000000'
);
