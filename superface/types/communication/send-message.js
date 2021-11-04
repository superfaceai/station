"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communicationSendMessage = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Send Message
     * Sends message via IM such as Messanger, Slack or MS Teams...
     **/
    "SendMessage": one_sdk_1.typeHelper()
};
exports.communicationSendMessage = {
    "communication/send-message": profile
};
