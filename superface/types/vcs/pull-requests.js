"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vcsPullRequests = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * PullRequests
     * Get pull requests of the specified repository.
     **/
    "PullRequests": one_sdk_1.typeHelper()
};
exports.vcsPullRequests = {
    "vcs/pull-requests": profile
};
