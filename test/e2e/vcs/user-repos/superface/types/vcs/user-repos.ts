import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type GetUserReposInput = {
    user?: unknown;
};
export type GetUserReposResult = {
    repos?: {
        name?: unknown;
        description?: unknown;
    }[];
};
const profile = {
    "GetUserRepos": typeHelper<GetUserReposInput, GetUserReposResult>()
};
export type VcsUserReposProfile = TypedProfile<typeof profile>;
export const vcsUserRepos = {
    "vcs/user-repos": profile
};
