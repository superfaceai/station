import { createTypedClient } from "@superfaceai/one-sdk";

import { communicationSendEmail } from "./types/communication/send-email";
import { communicationSendMessage } from './types/communication/send-message';

export { CommunicationSendEmailProfile } from "./types/communication/send-email";
export const typeDefinitions = {
    ...communicationSendEmail,
    ...communicationSendMessage
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
