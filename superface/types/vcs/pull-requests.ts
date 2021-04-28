import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';
/** pull-requests usecase **/
export interface PullRequestsInput {
  owner?: unknown;
  repo?: unknown;
}
/** pull-requests usecase **/
export interface PullRequestsResult {
  repos?: {
    title?: unknown;
    id?: unknown;
    url?: unknown;
    sha?: unknown;
  }[];
}
const profile = {
  "PullRequests": typeHelper<PullRequestsInput, PullRequestsResult>()
};
export type VcsPullRequestsProfile = TypedProfile<typeof profile>;
export const vcsPullRequests = {
  "vcs/pull-requests": profile
};
