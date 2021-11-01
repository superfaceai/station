import { TypedProfile } from '@superfaceai/one-sdk';
export declare type VcsPullRequestPullRequestInput = {
    /**
     * Owner
     * Owner of the repository
     **/
    owner: string;
    /**
     * Repo
     * Repository name
     **/
    repo: string;
    /**
     * Identifier
     * Id of pull request
     **/
    identifier: number;
};
export declare type VcsPullRequestPullRequestResult = {
    /**
     * Tittle
     * Title of pull request
     **/
    title: string;
    /**
     * Id
     * Pull request Id
     **/
    id: number;
    /**
     * Url
     * Web url of pull request
     **/
    url: string;
    /**
     * Sha
     * Pull request sha
     **/
    sha: string;
};
declare const profile: {
    /**
     * PullRequest
     * Get details of the specified pull request.
     **/
    PullRequest: [VcsPullRequestPullRequestInput, VcsPullRequestPullRequestResult];
};
export declare type VcsPullRequestProfile = TypedProfile<typeof profile>;
export declare const vcsPullRequest: {
    "vcs/pull-request": {
        /**
         * PullRequest
         * Get details of the specified pull request.
         **/
        PullRequest: [VcsPullRequestPullRequestInput, VcsPullRequestPullRequestResult];
    };
};
export {};
