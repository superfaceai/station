"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageAnalyzePlainTextSentiment = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Analyze plain text sentiment
     * Determines writer's attitude in the text as positive, negative, or neutral.
     **/
    "AnalyzePlainTextSentiment": one_sdk_1.typeHelper()
};
exports.languageAnalyzePlainTextSentiment = {
    "language/analyze-plain-text-sentiment": profile
};
