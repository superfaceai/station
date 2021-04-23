import { createTypedClient } from '@superfaceai/one-sdk';
import { communicationSendMessage } from './types/communication/send-message';
export const typeDefinitions = {
    ...communicationSendMessage
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
