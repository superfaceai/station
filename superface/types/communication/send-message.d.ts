import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CommunicationSendMessageSendMessageInput = {
    destination: string;
    text: string;
};
export declare type CommunicationSendMessageSendMessageResult = {
    /**
     * Destination
     * Representation of a messaging destination. Can be ID or channel name, depending on the provider capability.
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
     * Sends message via IM such as Messanger, Slack or MS Teams...
     **/
    SendMessage: [CommunicationSendMessageSendMessageInput, CommunicationSendMessageSendMessageResult];
};
export declare type CommunicationSendMessageProfile = TypedProfile<typeof profile>;
export declare const communicationSendMessage: {
    "communication/send-message": {
        /**
         * Send Message
         * Sends message via IM such as Messanger, Slack or MS Teams...
         **/
        SendMessage: [CommunicationSendMessageSendMessageInput, CommunicationSendMessageSendMessageResult];
    };
};
export {};
