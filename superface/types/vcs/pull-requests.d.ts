import { TypedProfile } from '@superfaceai/one-sdk';
export declare type VcsPullRequestsPullRequestsInput = {
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
};
export declare type VcsPullRequestsPullRequestsResult = {
    pullRequests?: {
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
    }[];
};
declare const profile: {
    /**
     * PullRequests
     * Get pull requests of the specified repository.
     **/
    PullRequests: [VcsPullRequestsPullRequestsInput, VcsPullRequestsPullRequestsResult];
};
export declare type VcsPullRequestsProfile = TypedProfile<typeof profile>;
export declare const vcsPullRequests: {
    "vcs/pull-requests": {
        /**
         * PullRequests
         * Get pull requests of the specified repository.
         **/
        PullRequests: [VcsPullRequestsPullRequestsInput, VcsPullRequestsPullRequestsResult];
    };
};
export {};
