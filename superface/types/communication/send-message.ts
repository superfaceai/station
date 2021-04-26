import { typeHelper } from '@superfaceai/one-sdk';
/**
 * Send Message
 * Send single text message
 **/
export interface SendMessageInput {
    /** Recepient of the message **/
    to?: unknown;
    /** Sender of the message **/
    from?: unknown;
    /** The text of the message **/
    text?: unknown;
}
/**
 * Send Message
 * Send single text message
 **/
export interface SendMessageResult {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string;
}
/**
 * Message Status
 * Retrieve status of a sent message
 **/
export interface RetrieveMessageStatusInput {
    /**
     * Identifier of Message
     * The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
     **/
    messageId?: string;
}
export type RetrieveMessageStatusResultDeliveryStatus = 'accepted' | 'delivered' | 'seen' | 'unknown' | 'failed';
/**
 * Message Status
 * Retrieve status of a sent message
 **/
export interface RetrieveMessageStatusResult {
    /**
     * Delivery Status of Message
     * Status of a sent message. Harmonized across different providers.
     **/
    deliveryStatus?: RetrieveMessageStatusResultDeliveryStatus;
}
export const communicationSendMessage = {
    "communication/send-message": {
        "SendMessage": typeHelper<SendMessageInput, SendMessageResult>(),
        "RetrieveMessageStatus": typeHelper<RetrieveMessageStatusInput, RetrieveMessageStatusResult>()
    }
};
