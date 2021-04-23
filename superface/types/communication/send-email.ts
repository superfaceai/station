import { typeHelper } from '@superfaceai/one-sdk';
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
export const communicationSendEmail = {
    "communication/send-email": {
        "SendEmail": typeHelper<SendEmailInput, SendEmailResult>()
    }
};
