"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vcsUserRepos = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Get User Repositories
     * Get repositories of the specified user.
     **/
    "UserRepos": one_sdk_1.typeHelper()
};
exports.vcsUserRepos = {
    "vcs/user-repos": profile
};
