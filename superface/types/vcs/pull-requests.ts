import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type VcsPullRequestsPullRequestsInput = {
    /** Owner of the repository **/
    owner: string;
    /** Repository name **/
    repo: string;
};
export type VcsPullRequestsPullRequestsResult = {
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
const profile = {
    /**
     * Get Pull Requests
     * Get pull requests of the specified repository.
     **/
    "PullRequests": typeHelper<VcsPullRequestsPullRequestsInput, VcsPullRequestsPullRequestsResult>()
};
export type VcsPullRequestsProfile = TypedProfile<typeof profile>;
export const vcsPullRequests = {
    "vcs/pull-requests": profile
};
