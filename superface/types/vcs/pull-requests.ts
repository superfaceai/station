import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type PullRequestsInput = {
    owner?: string;
    repo?: string;
};
export type PullRequestsResult = {
    pullRequests?: {
        title?: string;
        id?: number;
        url?: string;
        sha?: string;
    }[];
};
const profile = {
    /** pull-requests usecase **/
    "PullRequests": typeHelper<PullRequestsInput, PullRequestsResult>()
};
export type VcsPullRequestsProfile = TypedProfile<typeof profile>;
export const vcsPullRequests = {
    "vcs/pull-requests": profile
};
