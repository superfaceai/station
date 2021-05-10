import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';

export type PullRequestInput = {
  owner?: string;
  repo?: string;
  identifier?: number;
};
export type PullRequestResult = {
  title?: string;
  id?: number;
  url?: string;
  sha?: string;
};
const profile = {
  /** pull-request usecase **/
  "PullRequest": typeHelper<PullRequestInput, PullRequestResult>()
};
export type VcsPullRequestProfile = TypedProfile<typeof profile>;
export const vcsPullRequest = {
  "vcs/pull-request": profile
};
