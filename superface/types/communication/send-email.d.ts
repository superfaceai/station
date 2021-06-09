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
export declare type CommunicationSendEmailSendTemplatedEmailInput = {
    from: unknown;
    to: unknown;
    templateId: unknown;
    templateData: unknown;
};
export declare type CommunicationSendEmailSendTemplatedEmailResult = {
    messageId?: unknown;
};
declare const profile: {
    /**
     * Send transactional email to one recipient
     * Email can contain text and/or html representation
     **/
    SendEmail: [CommunicationSendEmailSendEmailInput, CommunicationSendEmailSendEmailResult];
    /**
     * Send templated transactional email to one recipient
     * Requires template defined on provider side.
     **/
    SendTemplatedEmail: [CommunicationSendEmailSendTemplatedEmailInput, CommunicationSendEmailSendTemplatedEmailResult];
};
export declare type CommunicationSendEmailProfile = TypedProfile<typeof profile>;
export declare const communicationSendEmail: {
    "communication/send-email": {
        /**
         * Send transactional email to one recipient
         * Email can contain text and/or html representation
         **/
        SendEmail: [CommunicationSendEmailSendEmailInput, CommunicationSendEmailSendEmailResult];
        /**
         * Send templated transactional email to one recipient
         * Requires template defined on provider side.
         **/
        SendTemplatedEmail: [CommunicationSendEmailSendTemplatedEmailInput, CommunicationSendEmailSendTemplatedEmailResult];
    };
};
export {};
