import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export interface SendEmailInput {
    from: unknown;
    to: unknown;
    subject: unknown;
    text?: unknown;
    html?: unknown;
}
export interface SendEmailResult {
    messageId?: unknown;
}
export const profile = {
    "SendEmail": typeHelper<SendEmailInput, SendEmailResult>()
};
export type CommunicationSendEmailProfile = TypedProfile<typeof profile>;
export const communicationSendEmail = {
    "communication/send-email": profile
};
