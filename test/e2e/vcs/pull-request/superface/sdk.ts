import { createTypedClient } from '@superfaceai/one-sdk';

import { vcsPullRequest } from './types/vcs/pull-request';

export { VcsPullRequestProfile } from "./types/vcs/pull-request";
export const typeDefinitions = {
    ...vcsPullRequest
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
