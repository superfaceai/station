import { TypedProfile } from '@superfaceai/one-sdk';
export declare type VcsPullRequestsPullRequestsInput = {
    /** Owner of the repository **/
    owner: string;
    /** Repository name **/
    repo: string;
};
export declare type VcsPullRequestsPullRequestsResult = {
    pullRequests?: {
        /** Title of pull request **/
        title: string;
        /** Pull request Id **/
        id: number;
        /** Web url of pull request **/
        url: string;
        /** Pull request sha **/
        sha: string;
    }[];
};
declare const profile: {
    /**
     * Get Pull Requests
     * Get pull requests of the specified repository.
     **/
    PullRequests: [VcsPullRequestsPullRequestsInput, VcsPullRequestsPullRequestsResult];
};
export declare type VcsPullRequestsProfile = TypedProfile<typeof profile>;
export declare const vcsPullRequests: {
    "vcs/pull-requests": {
        /**
         * Get Pull Requests
         * Get pull requests of the specified repository.
         **/
        PullRequests: [VcsPullRequestsPullRequestsInput, VcsPullRequestsPullRequestsResult];
    };
};
export {};
