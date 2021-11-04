import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CommunicationSendMessageSendMessageInput = {
    /**
     * Destination
     * Representation of a messaging destination. Can be ID or channel name, depending on the provider capability.
     **/
    destination: string;
    /**
     * Text
     * Text of the message
     **/
    text: string;
};
export declare type CommunicationSendMessageSendMessageResult = {
    /**
     * "
     * Destination
     *     Identifier of the destination where the message was sent.
     **/
    destination?: unknown;
    /**
     * Message ID
     * Identifier of the message that was sent
     **/
    messageId?: unknown;
};
declare const profile: {
    /**
     * Send Message
     * Sends message to one destination
     **/
    SendMessage: [CommunicationSendMessageSendMessageInput, CommunicationSendMessageSendMessageResult];
};
export declare type CommunicationSendMessageProfile = TypedProfile<typeof profile>;
export declare const communicationSendMessage: {
    "communication/send-message": {
        /**
         * Send Message
         * Sends message to one destination
         **/
        SendMessage: [CommunicationSendMessageSendMessageInput, CommunicationSendMessageSendMessageResult];
    };
};
export {};
