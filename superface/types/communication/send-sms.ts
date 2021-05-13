import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type SendMessageInput = {
    /** Recepient of the message **/
    to?: unknown;
    /** Sender of the message **/
    from?: unknown;
    /** The text of the message **/
    text?: unknown;
};
export type SendMessageResult = {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string;
};
export type RetrieveMessageStatusInput = {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string;
};
export type RetrieveMessageStatusResult = {
    /**
     * Delivery Status of Message
     * Status of a sent message. Harmonized across different providers.
     **/
    deliveryStatus?: 'accepted' | 'delivered' | 'seen' | 'unknown' | 'failed';
};
const profile = {
    /**
     * Send Message
     * Send single text message
     **/
    "SendMessage": typeHelper<SendMessageInput, SendMessageResult>(),
    /**
     * Message Status
     * Retrieve status of a sent message
     **/
    "RetrieveMessageStatus": typeHelper<RetrieveMessageStatusInput, RetrieveMessageStatusResult>()
};
export type CommunicationSendSmsProfile = TypedProfile<typeof profile>;
export const communicationSendSms = {
    "communication/send-sms": profile
};
