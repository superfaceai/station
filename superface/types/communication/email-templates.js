"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationEmailTemplates = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * List all Templates
     * Result isn't paginated, amount of returned templates depenends on provider.
     **/
    "ListTemplates": one_sdk_1.typeHelper(),
    /** Obtain template content **/
    "GetTemplateContent": one_sdk_1.typeHelper(),
    /** Create new template **/
    "CreateTemplate": one_sdk_1.typeHelper(),
    /** Update template **/
    "UpdateTemplate": one_sdk_1.typeHelper()
};
exports.communicationEmailTemplates = {
    "communication/email-templates": profile
};
