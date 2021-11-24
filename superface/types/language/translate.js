"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageTranslate = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Translate text usecase
     * Translate text to another language
     **/
    "TranslateText": one_sdk_1.typeHelper()
};
exports.languageTranslate = {
    "language/translate": profile
};
