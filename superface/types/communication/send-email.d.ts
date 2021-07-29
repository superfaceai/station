import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CommunicationSendEmailSendEmailInput = {
    /**
     * From
     * The sender's email address.
     **/
    from: unknown;
    /**
     * To
     * The recipient's email address.
     **/
    to: unknown;
    /**
     * Subject
     * The subject of your email. See character length requirements according to RFC 2822.
     **/
    subject: unknown;
    /**
     * Text
     * The plain text email message.
     **/
    text?: unknown;
    /**
     * HTML
     * The HTML email message.
     **/
    html?: unknown;
};
export declare type CommunicationSendEmailSendEmailResult = {
    /**
     * Message Identifier
     * The identifier is provider-specific and not unique.
     **/
    messageId: unknown;
};
declare const profile: {
    /**
     * Send Email
     * Send transactional email to one recipient.
     * Email can contain text and/or html representation.
     **/
    SendEmail: [CommunicationSendEmailSendEmailInput, CommunicationSendEmailSendEmailResult];
};
export declare type CommunicationSendEmailProfile = TypedProfile<typeof profile>;
export declare const communicationSendEmail: {
    "communication/send-email": {
        /**
         * Send Email
         * Send transactional email to one recipient.
         * Email can contain text and/or html representation.
         **/
        SendEmail: [CommunicationSendEmailSendEmailInput, CommunicationSendEmailSendEmailResult];
    };
};
export {};
