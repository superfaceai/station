import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CommunicationEmailTemplatesListTemplatesResult = {
    /**
     * Id
     * Unique template identifier
     **/
    id?: unknown;
    /**
     * Name
     * Name of the template
     **/
    name?: unknown;
}[];
export declare type CommunicationEmailTemplatesGetTemplateContentInput = {
    /**
     * Id
     * Unique template identifier
     **/
    id: unknown;
};
export declare type CommunicationEmailTemplatesGetTemplateContentResult = {
    /**
     * Subject
     * Subject of the email
     **/
    subject?: unknown;
    /**
     * Text Content
     * Text version of the template
     **/
    text?: unknown;
    /**
     * HTML Content
     * HTML version of the template
     **/
    html?: unknown;
};
export declare type CommunicationEmailTemplatesCreateTemplateInput = {
    /**
     * Name
     * Name of the template
     **/
    name: unknown;
    /**
     * Subject
     * Subject of the email
     **/
    subject: unknown;
    /**
     * Text Content
     * Text version of the template
     **/
    text: unknown;
    /**
     * HTML Content
     * HTML version of the template
     **/
    html: unknown;
};
/**
 * Template
 * Minimal information about the template
 **/
export declare type CommunicationEmailTemplatesCreateTemplateResult = {
    /**
     * Id
     * Unique template identifier
     **/
    id?: unknown;
    /**
     * Name
     * Name of the template
     **/
    name?: unknown;
};
export declare type CommunicationEmailTemplatesUpdateTemplateInput = {
    /**
     * Id
     * Unique template identifier
     **/
    id: unknown;
    /**
     * Name
     * Name of the template
     **/
    name?: unknown;
    /**
     * Subject
     * Subject of the email
     **/
    subject?: unknown;
    /**
     * Text Content
     * Text version of the template
     **/
    text?: unknown;
    /**
     * HTML Content
     * HTML version of the template
     **/
    html?: unknown;
};
/**
 * Template
 * Minimal information about the template
 **/
export declare type CommunicationEmailTemplatesUpdateTemplateResult = {
    /**
     * Id
     * Unique template identifier
     **/
    id?: unknown;
    /**
     * Name
     * Name of the template
     **/
    name?: unknown;
};
declare const profile: {
    /**
     * List all templates
     * Result isn't paginated, amount of returned templates depenends on provider.
     **/
    ListTemplates: [any, CommunicationEmailTemplatesListTemplatesResult];
    /**
     * Get template content
     * Obtain template content
     **/
    GetTemplateContent: [CommunicationEmailTemplatesGetTemplateContentInput, CommunicationEmailTemplatesGetTemplateContentResult];
    /**
     * Create template
     * Creates new template
     **/
    CreateTemplate: [CommunicationEmailTemplatesCreateTemplateInput, CommunicationEmailTemplatesCreateTemplateResult];
    /**
     * Update template
     * Updates template with specified id
     **/
    UpdateTemplate: [CommunicationEmailTemplatesUpdateTemplateInput, CommunicationEmailTemplatesUpdateTemplateResult];
};
export declare type CommunicationEmailTemplatesProfile = TypedProfile<typeof profile>;
export declare const communicationEmailTemplates: {
    "communication/email-templates": {
        /**
         * List all templates
         * Result isn't paginated, amount of returned templates depenends on provider.
         **/
        ListTemplates: [any, CommunicationEmailTemplatesListTemplatesResult];
        /**
         * Get template content
         * Obtain template content
         **/
        GetTemplateContent: [CommunicationEmailTemplatesGetTemplateContentInput, CommunicationEmailTemplatesGetTemplateContentResult];
        /**
         * Create template
         * Creates new template
         **/
        CreateTemplate: [CommunicationEmailTemplatesCreateTemplateInput, CommunicationEmailTemplatesCreateTemplateResult];
        /**
         * Update template
         * Updates template with specified id
         **/
        UpdateTemplate: [CommunicationEmailTemplatesUpdateTemplateInput, CommunicationEmailTemplatesUpdateTemplateResult];
    };
};
export {};
