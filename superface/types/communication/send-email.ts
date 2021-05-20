import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type SendEmailInput = {
    from: unknown;
    to: unknown;
    subject: unknown;
    text?: unknown;
    html?: unknown;
};
export type SendEmailResult = {
    messageId?: unknown;
};
export type SendTemplatedEmailInput = {
    from: unknown;
    to: unknown;
    templateId: unknown;
    templateData: unknown;
};
export type SendTemplatedEmailResult = {
    messageId?: unknown;
};
const profile = {
    /**
     * Send transactional email to one recipient
     * Email can contain text and/or html representation
     **/
    "SendEmail": typeHelper<SendEmailInput, SendEmailResult>(),
    /**
     * Send templated transactional email to one recipient
     * Requires template defined on provider side.
     **/
    "SendTemplatedEmail": typeHelper<SendTemplatedEmailInput, SendTemplatedEmailResult>()
};
export type CommunicationSendEmailProfile = TypedProfile<typeof profile>;
export const communicationSendEmail = {
    "communication/send-email": profile
};
