import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type CommunicationSendSmsSendMessageInput = {
    /** Recepient of the message **/
    to?: unknown;
    /** Sender of the message **/
    from?: unknown;
    /** The text of the message **/
    text?: unknown;
};
export type CommunicationSendSmsSendMessageResult = {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string | null;
};
export type CommunicationSendSmsRetrieveMessageStatusInput = {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string | null;
};
export type CommunicationSendSmsRetrieveMessageStatusResult = {
    /**
     * Delivery Status of Message
     * Status of a sent message. Harmonized across different providers.
     **/
    deliveryStatus?: 'accepted' | 'delivered' | 'seen' | 'unknown' | 'failed';
};
const profile = {
    /**
     * Send SMS Message
     * Send single text message
     **/
    "SendMessage": typeHelper<CommunicationSendSmsSendMessageInput, CommunicationSendSmsSendMessageResult>(),
    /**
     * Message Status
     * Retrieve status of a sent SMS message
     **/
    "RetrieveMessageStatus": typeHelper<CommunicationSendSmsRetrieveMessageStatusInput, CommunicationSendSmsRetrieveMessageStatusResult>()
};
export type CommunicationSendSmsProfile = TypedProfile<typeof profile>;
export const communicationSendSms = {
    "communication/send-sms": profile
};
