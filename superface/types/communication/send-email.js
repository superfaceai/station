"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationSendEmail = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Send transactional email to one recipient
     * Email can contain text and/or html representation
     **/
    "SendEmail": one_sdk_1.typeHelper(),
    /**
     * Send templated transactional email to one recipient
     * Requires template defined on provider side.
     **/
    "SendTemplatedEmail": one_sdk_1.typeHelper()
};
exports.communicationSendEmail = {
    "communication/send-email": profile
};
