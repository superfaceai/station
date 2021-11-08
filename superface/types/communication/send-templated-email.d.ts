import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CommunicationSendTemplatedEmailSendTemplatedEmailInput = {
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
     * Template Identifier
     * The template to use when sending email message.
     **/
    templateId: unknown;
    /**
     * Template Data
     * Template data to be applied to the specified template to generate html, test, and subject.
     * The value is a collection of key/value pairs following the pattern `variable_name`: `value to insert`.
     * This field should be used in combination with `templateId` to identify what template to use.
     **/
    templateData: unknown;
};
export declare type CommunicationSendTemplatedEmailSendTemplatedEmailResult = {
    /**
     * Message Identifier
     * The identifier is provider-specific and not unique.
     **/
    messageId: unknown;
};
declare const profile: {
    /**
     * Send Templated Email
     * Send templated transactional email to one recipient.
     * Requires template defined on provider side.
     **/
    SendTemplatedEmail: [CommunicationSendTemplatedEmailSendTemplatedEmailInput, CommunicationSendTemplatedEmailSendTemplatedEmailResult];
};
export declare type CommunicationSendTemplatedEmailProfile = TypedProfile<typeof profile>;
export declare const communicationSendTemplatedEmail: {
    "communication/send-templated-email": {
        /**
         * Send Templated Email
         * Send templated transactional email to one recipient.
         * Requires template defined on provider side.
         **/
        SendTemplatedEmail: [CommunicationSendTemplatedEmailSendTemplatedEmailInput, CommunicationSendTemplatedEmailSendTemplatedEmailResult];
    };
};
export {};
