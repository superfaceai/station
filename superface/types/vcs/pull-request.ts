import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type VcsPullRequestPullRequestInput = {
    /** Owner of the repository **/
    owner: string;
    /** Repository name **/
    repo: string;
    /** Id of pull request **/
    identifier: number;
};
export type VcsPullRequestPullRequestResult = {
    /** Title of pull request **/
    title: string;
    /** Pull request Id **/
    id: number;
    /** Web url of pull request **/
    url: string;
    /** Pull request sha **/
    sha: string;
};
const profile = {
    /**
     * Get Pull Request Details
     * Get details of the specified pull request.
     **/
    "PullRequest": typeHelper<VcsPullRequestPullRequestInput, VcsPullRequestPullRequestResult>()
};
export type VcsPullRequestProfile = TypedProfile<typeof profile>;
export const vcsPullRequest = {
    "vcs/pull-request": profile
};
