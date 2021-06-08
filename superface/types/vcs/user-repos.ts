import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type VcsUserReposUserReposInput = {
    /**
     * User name
     * User identifier for whom to list repositories. Some providers use authenticated user instead
     **/
    user: string;
};
export type VcsUserReposUserReposResult = {
    repos?: {
        /** Name of the repository **/
        name: string;
        /** Description of the repository **/
        description?: string;
    }[];
};
const profile = {
    /**
     * Get User Repositories
     * Get repositories of the specified user.
     **/
    "UserRepos": typeHelper<VcsUserReposUserReposInput, VcsUserReposUserReposResult>()
};
export type VcsUserReposProfile = TypedProfile<typeof profile>;
export const vcsUserRepos = {
    "vcs/user-repos": profile
};
