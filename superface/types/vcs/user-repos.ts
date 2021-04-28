import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';

export interface UserReposInput {
  user?: unknown;
}
export interface UserReposResult {
  repos?: {
    name?: unknown;
    description?: unknown;
  }[];
}
const profile = {
  "UserRepos": typeHelper<UserReposInput, UserReposResult>()
};
export type VcsUserReposProfile = TypedProfile<typeof profile>;
export const vcsUserRepos = {
  "vcs/user-repos": profile
};
