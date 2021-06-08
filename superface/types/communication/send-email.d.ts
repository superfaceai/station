import { TypedProfile } from '@superfaceai/one-sdk';

export declare type CommunicationSendEmailSendEmailInput = {
    from: unknown;
    to: unknown;
    subject: unknown;
    text?: unknown;
    html?: unknown;
};
export declare type CommunicationSendEmailSendEmailResult = {
    messageId?: unknown;
};
declare const profile: {
    /**
     * Send transactional email to one recipient
     * Email can contain text and/or html representation
     **/
    SendEmail: [CommunicationSendEmailSendEmailInput, CommunicationSendEmailSendEmailResult];
};
export declare type CommunicationSendEmailProfile = TypedProfile<typeof profile>;
export declare const communicationSendEmail: {
    "communication/send-email": {
        /**
         * Send transactional email to one recipient
         * Email can contain text and/or html representation
         **/
        SendEmail: [CommunicationSendEmailSendEmailInput, CommunicationSendEmailSendEmailResult];
    };
};
export {};
