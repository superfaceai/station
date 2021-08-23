import { TypedProfile } from '@superfaceai/one-sdk';

export declare type CommunicationSendMessageSendMessageInput = {
    /** Representation of a messaging destionation. Can be ID or channel name, depending on the provider capability. **/
    destination: string;
    /** Text of the message **/
    text: string;
    avatar?: {
        /** Name of the avatar **/
        name?: string | null;
        /** URL of the picture or emoji. **/
        picture?: string | null;
    };
    attachments?: unknown;
};
export declare type CommunicationSendMessageSendMessageResult = {
    /** Identifier of the destination where the message was sent. **/
    destinationId?: unknown;
    /** Identifier of the message that was sent **/
    messageId?: unknown;
};
declare const profile: {
    /** Sends message via IM such as Messanger, Slack or MS Teams... **/
    SendMessage: [CommunicationSendMessageSendMessageInput, CommunicationSendMessageSendMessageResult];
};
export declare type CommunicationSendMessageProfile = TypedProfile<typeof profile>;
export declare const communicationSendMessage: {
    "communication/send-message": {
        /** Sends message via IM such as Messanger, Slack or MS Teams... **/
        SendMessage: [CommunicationSendMessageSendMessageInput, CommunicationSendMessageSendMessageResult];
    };
};
export {};
