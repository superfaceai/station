import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type PullRequestsInput = {
    /** Owner of the repository **/
    owner: string;
    /** Repository name **/
    repo: string;
};
export type PullRequestsResult = {
    pullRequests?: {
        /** Title of pull request **/
        title?: string;
        /** Pull request Id **/
        id?: number;
        /** Web url of pull request **/
        url?: string;
        /** Pull request sha **/
        sha?: string;
    }[];
};
const profile = {
    "PullRequests": typeHelper<PullRequestsInput, PullRequestsResult>()
};
export type VcsPullRequestsProfile = TypedProfile<typeof profile>;
export const vcsPullRequests = {
    "vcs/pull-requests": profile
};
