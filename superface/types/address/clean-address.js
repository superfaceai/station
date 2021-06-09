"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressCleanAddress = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Clean Address
     * This use case will take an address like:
     *
     * {
     *   street: '3301 South Greenfield Road',
     *   city: 'Gilbert',
     *   state: 'AZ',
     *   zipcode: '85297',
     * }
     *
     * And convert it to:
     *
     * {
     *   city: 'Gilbert',
     *   state: 'AZ',
     *   street: '3301 S Greenfield Rd',
     *   zipcode: '85297',
     * }
     *
     * This is useful for cleaning up addresses input by users.
     **/
    "CleanAddress": one_sdk_1.typeHelper()
};
exports.addressCleanAddress = {
    "address/clean-address": profile
};
