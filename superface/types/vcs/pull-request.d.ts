import { TypedProfile } from '@superfaceai/one-sdk';

export declare type VcsPullRequestPullRequestInput = {
    /** Owner of the repository **/
    owner: string;
    /** Repository name **/
    repo: string;
    /** Id of pull request **/
    identifier: number;
};
export declare type VcsPullRequestPullRequestResult = {
    /** Title of pull request **/
    title: string;
    /** Pull request Id **/
    id: number;
    /** Web url of pull request **/
    url: string;
    /** Pull request sha **/
    sha: string;
};
declare const profile: {
    /**
     * Get Pull Request Details
     * Get details of the specified pull request.
     **/
    PullRequest: [VcsPullRequestPullRequestInput, VcsPullRequestPullRequestResult];
};
export declare type VcsPullRequestProfile = TypedProfile<typeof profile>;
export declare const vcsPullRequest: {
    "vcs/pull-request": {
        /**
         * Get Pull Request Details
         * Get details of the specified pull request.
         **/
        PullRequest: [VcsPullRequestPullRequestInput, VcsPullRequestPullRequestResult];
    };
};
export {};
