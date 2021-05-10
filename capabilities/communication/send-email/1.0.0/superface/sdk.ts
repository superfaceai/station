import { createTypedClient } from "@superfaceai/one-sdk";

import { communicationSendEmail } from "./types/communication/send-email";

export { CommunicationSendEmailProfile } from "./types/communication/send-email";
export const typeDefinitions = {
    ...communicationSendEmail
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
