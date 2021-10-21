"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoExchangeRate = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Get Exchange Rate
     * Get exchange rate of two currencies
     **/
    "GetExchangeRate": one_sdk_1.typeHelper()
};
exports.cryptoExchangeRate = {
    "crypto/exchange-rate": profile
};
