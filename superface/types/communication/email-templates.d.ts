import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CommunicationEmailTemplatesListTemplatesResult = {
    id?: unknown;
    name?: unknown;
}[];
export declare type CommunicationEmailTemplatesGetTemplateDataInput = {
    id: unknown;
};
export declare type CommunicationEmailTemplatesGetTemplateDataResult = {
    subject?: unknown;
    text?: unknown;
    html?: unknown;
};
export declare type CommunicationEmailTemplatesCreateTemplateInput = {
    name: unknown;
    subject: unknown;
    text: unknown;
    html: unknown;
};
export declare type CommunicationEmailTemplatesCreateTemplateResult = {
    id?: unknown;
    name?: unknown;
};
declare const profile: {
    ListTemplates: [any, CommunicationEmailTemplatesListTemplatesResult];
    GetTemplateData: [CommunicationEmailTemplatesGetTemplateDataInput, CommunicationEmailTemplatesGetTemplateDataResult];
    CreateTemplate: [CommunicationEmailTemplatesCreateTemplateInput, CommunicationEmailTemplatesCreateTemplateResult];
};
export declare type CommunicationEmailTemplatesProfile = TypedProfile<typeof profile>;
export declare const communicationEmailTemplates: {
    "communication/email-templates": {
        ListTemplates: [any, CommunicationEmailTemplatesListTemplatesResult];
        GetTemplateData: [CommunicationEmailTemplatesGetTemplateDataInput, CommunicationEmailTemplatesGetTemplateDataResult];
        CreateTemplate: [CommunicationEmailTemplatesCreateTemplateInput, CommunicationEmailTemplatesCreateTemplateResult];
    };
};
export {};
