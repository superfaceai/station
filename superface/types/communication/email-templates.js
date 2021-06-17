"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationEmailTemplates = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    "ListTemplates": one_sdk_1.typeHelper(),
    "GetTemplateData": one_sdk_1.typeHelper(),
    "CreateTemplate": one_sdk_1.typeHelper()
};
exports.communicationEmailTemplates = {
    "communication/email-templates": profile
};
