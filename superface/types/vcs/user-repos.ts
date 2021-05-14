import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type UserReposInput = {
    /** User identifier for whom to list repositories **/
    user: string;
};
export type UserReposResult = {
    repos?: {
        /** Name of the repository **/
        name?: string;
        /** Description of the repository **/
        description?: string;
    }[];
};
const profile = {
    "UserRepos": typeHelper<UserReposInput, UserReposResult>()
};
export type VcsUserReposProfile = TypedProfile<typeof profile>;
export const vcsUserRepos = {
    "vcs/user-repos": profile
};
