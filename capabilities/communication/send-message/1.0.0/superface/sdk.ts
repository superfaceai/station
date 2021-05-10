import { createTypedClient } from "@superfaceai/one-sdk";

import { communicationSendMessage } from "./types/communication/send-message";

export { CommunicationSendMessageProfile } from "./types/communication/send-message";
export const typeDefinitions = {
    ...communicationSendMessage
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
