"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationAnalyzePlainTextSentiment = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Analyze plain text sentiment
     * Determines writer's attitude in the text as positive, negative, or neutral.
     **/
    "AnalyzePlainTextSentiment": (0, one_sdk_1.typeHelper)()
};
exports.translationAnalyzePlainTextSentiment = {
    "language/analyze-plain-text-sentiment": profile
};
