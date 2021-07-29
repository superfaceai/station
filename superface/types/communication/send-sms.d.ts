import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CommunicationSendSmsSendMessageInput = {
    /** Recepient of the message **/
    to?: unknown;
    /** Sender of the message **/
    from?: unknown;
    /** The text of the message **/
    text?: unknown;
};
export declare type CommunicationSendSmsSendMessageResult = {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string | null;
};
export declare type CommunicationSendSmsRetrieveMessageStatusInput = {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string | null;
};
export declare type CommunicationSendSmsRetrieveMessageStatusResult = {
    /**
     * Delivery Status of Message
     * Status of a sent message. Harmonized across different providers.
     **/
    deliveryStatus?: 'accepted' | 'delivered' | 'seen' | 'unknown' | 'failed';
};
declare const profile: {
    /**
     * Send SMS Message
     * Send single text message
     **/
    SendMessage: [CommunicationSendSmsSendMessageInput, CommunicationSendSmsSendMessageResult];
    /**
     * Message Status
     * Retrieve status of a sent SMS message
     **/
    RetrieveMessageStatus: [CommunicationSendSmsRetrieveMessageStatusInput, CommunicationSendSmsRetrieveMessageStatusResult];
};
export declare type CommunicationSendSmsProfile = TypedProfile<typeof profile>;
export declare const communicationSendSms: {
    "communication/send-sms": {
        /**
         * Send SMS Message
         * Send single text message
         **/
        SendMessage: [CommunicationSendSmsSendMessageInput, CommunicationSendSmsSendMessageResult];
        /**
         * Message Status
         * Retrieve status of a sent SMS message
         **/
        RetrieveMessageStatus: [CommunicationSendSmsRetrieveMessageStatusInput, CommunicationSendSmsRetrieveMessageStatusResult];
    };
};
export {};
