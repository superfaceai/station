"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationSendEmail = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Send Email
     * Send transactional email to one recipient.
     * Email can contain text and/or html representation.
     **/
    "SendEmail": one_sdk_1.typeHelper()
};
exports.communicationSendEmail = {
    "communication/send-email": profile
};
