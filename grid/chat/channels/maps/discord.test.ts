import { getChannelsTest } from './channels';

/**
 * Live tests
 *
 * @group live/safe
 */

getChannelsTest('discord', {
  valid: '935962220104396881',
  invalid: '000000000000000000',
});
