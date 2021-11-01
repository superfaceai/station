"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vcsPullRequest = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * PullRequest
     * Get details of the specified pull request.
     **/
    "PullRequest": one_sdk_1.typeHelper()
};
exports.vcsPullRequest = {
    "vcs/pull-request": profile
};
