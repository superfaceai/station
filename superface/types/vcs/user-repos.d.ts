import { TypedProfile } from '@superfaceai/one-sdk';
export declare type VcsUserReposUserReposInput = {
    /**
     * User name
     * User identifier for whom to list repositories. Some providers use authenticated user instead
     **/
    user: string;
};
export declare type VcsUserReposUserReposResult = {
    repos?: {
        /** Name of the repository **/
        name: string;
        /** Description of the repository **/
        description?: string;
    }[];
};
declare const profile: {
    /**
     * Get User Repositories
     * Get repositories of the specified user.
     **/
    UserRepos: [VcsUserReposUserReposInput, VcsUserReposUserReposResult];
};
export declare type VcsUserReposProfile = TypedProfile<typeof profile>;
export declare const vcsUserRepos: {
    "vcs/user-repos": {
        /**
         * Get User Repositories
         * Get repositories of the specified user.
         **/
        UserRepos: [VcsUserReposUserReposInput, VcsUserReposUserReposResult];
    };
};
export {};
