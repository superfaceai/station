"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationSendSms = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Send SMS Message
     * Send single text message
     **/
    "SendMessage": one_sdk_1.typeHelper(),
    /**
     * Message Status
     * Retrieve status of a sent SMS message
     **/
    "RetrieveMessageStatus": one_sdk_1.typeHelper()
};
exports.communicationSendSms = {
    "communication/send-sms": profile
};
