"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationSendMessage = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Send Message
     * Sends message to one destination
     **/
    "SendMessage": one_sdk_1.typeHelper()
};
exports.communicationSendMessage = {
    "communication/send-message": profile
};
