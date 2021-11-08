"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speechSynthesis = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Text to speech synthesis
     * Convert text into speech synchronously.
     **/
    "TextToSpeechSynthesis": one_sdk_1.typeHelper()
};
exports.speechSynthesis = {
    "speech/synthesis": profile
};
