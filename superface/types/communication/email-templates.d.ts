import { TypedProfile } from '@superfaceai/one-sdk';

export declare type CommunicationEmailTemplatesListTemplatesResult = {
    /** Unique template identifier **/
    id?: unknown;
    /** Name of the template **/
    name?: unknown;
}[];
export declare type CommunicationEmailTemplatesGetTemplateContentInput = {
    /** Unique template identifier **/
    id: unknown;
};
export declare type CommunicationEmailTemplatesGetTemplateContentResult = {
    /** Subject of the email **/
    subject?: unknown;
    /** Text content **/
    text?: unknown;
    /** HTML Content **/
    html?: unknown;
};
export declare type CommunicationEmailTemplatesCreateTemplateInput = {
    /** Name of the template **/
    name: unknown;
    /** Subject of the email **/
    subject: unknown;
    /** Text content **/
    text: unknown;
    /** HTML Content **/
    html: unknown;
};
export declare type CommunicationEmailTemplatesCreateTemplateResult = {
    /** Unique template identifier **/
    id?: unknown;
    /** Name of the template **/
    name?: unknown;
};
export declare type CommunicationEmailTemplatesUpdateTemplateInput = {
    /** Unique template identifier **/
    id: unknown;
    /** Name of the template **/
    name?: unknown;
    /** Subject of the email **/
    subject?: unknown;
    /** Text content **/
    text?: unknown;
    /** HTML Content **/
    html?: unknown;
};
export declare type CommunicationEmailTemplatesUpdateTemplateResult = {
    /** Unique template identifier **/
    id?: unknown;
    /** Name of the template **/
    name?: unknown;
};
declare const profile: {
    /**
     * List all Templates
     * Result isn't paginated, amount of returned templates depenends on provider.
     **/
    ListTemplates: [any, CommunicationEmailTemplatesListTemplatesResult];
    /** Obtain template content **/
    GetTemplateContent: [CommunicationEmailTemplatesGetTemplateContentInput, CommunicationEmailTemplatesGetTemplateContentResult];
    /** Create new template **/
    CreateTemplate: [CommunicationEmailTemplatesCreateTemplateInput, CommunicationEmailTemplatesCreateTemplateResult];
    /** Update template **/
    UpdateTemplate: [CommunicationEmailTemplatesUpdateTemplateInput, CommunicationEmailTemplatesUpdateTemplateResult];
};
export declare type CommunicationEmailTemplatesProfile = TypedProfile<typeof profile>;
export declare const communicationEmailTemplates: {
    "communication/email-templates": {
        /**
         * List all Templates
         * Result isn't paginated, amount of returned templates depenends on provider.
         **/
        ListTemplates: [any, CommunicationEmailTemplatesListTemplatesResult];
        /** Obtain template content **/
        GetTemplateContent: [CommunicationEmailTemplatesGetTemplateContentInput, CommunicationEmailTemplatesGetTemplateContentResult];
        /** Create new template **/
        CreateTemplate: [CommunicationEmailTemplatesCreateTemplateInput, CommunicationEmailTemplatesCreateTemplateResult];
        /** Update template **/
        UpdateTemplate: [CommunicationEmailTemplatesUpdateTemplateInput, CommunicationEmailTemplatesUpdateTemplateResult];
    };
};
export {};
