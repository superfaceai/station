import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';

export type UserReposInput = {
  user?: unknown;
};
export type UserReposResult = {
  repos?: {
    name?: string;
    description?: unknown;
  }[];
};
const profile = {
  "UserRepos": typeHelper<UserReposInput, UserReposResult>()
};
export type VcsUserReposProfile = TypedProfile<typeof profile>;
export const vcsUserRepos = {
  "vcs/user-repos": profile
};
