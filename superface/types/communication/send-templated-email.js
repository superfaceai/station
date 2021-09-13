"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationSendTemplatedEmail = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Send Templated Email
     * Send templated transactional email to one recipient.
     * Requires template defined on provider side.
     **/
    "SendTemplatedEmail": one_sdk_1.typeHelper()
};
exports.communicationSendTemplatedEmail = {
    "communication/send-templated-email": profile
};
