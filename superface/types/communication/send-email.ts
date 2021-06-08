import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type CommunicationSendEmailSendEmailInput = {
    from: unknown;
    to: unknown;
    subject: unknown;
    text?: unknown;
    html?: unknown;
};
export type CommunicationSendEmailSendEmailResult = {
    messageId?: unknown;
};
const profile = {
    /**
     * Send transactional email to one recipient
     * Email can contain text and/or html representation
     **/
    "SendEmail": typeHelper<CommunicationSendEmailSendEmailInput, CommunicationSendEmailSendEmailResult>()
};
export type CommunicationSendEmailProfile = TypedProfile<typeof profile>;
export const communicationSendEmail = {
    "communication/send-email": profile
};
