import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';
/** pull-request usecase **/
export interface PullRequestInput {
    owner?: unknown;
    repo?: unknown;
    identifier?: unknown;
}
/** pull-request usecase **/
export interface PullRequestResult {
    title?: unknown;
    id?: unknown;
    url?: unknown;
    sha?: unknown;
}
export const profile = {
    "PullRequest": typeHelper<PullRequestInput, PullRequestResult>()
};
export type VcsPullRequestProfile = TypedProfile<typeof profile>;
export const vcsPullRequest = {
    "vcs/pull-request": profile
};
