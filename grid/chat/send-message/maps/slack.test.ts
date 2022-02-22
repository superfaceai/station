import { sendMessageTest } from './send-message';

sendMessageTest('slack', { valid: 'CF3H7S63W', invalid: 'not-existing-dest' });
