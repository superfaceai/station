import { createTypedClient } from "@superfaceai/one-sdk";

import { vcsPullRequests } from "./types/vcs/pull-requests";

export { VcsPullRequestsProfile } from "./types/vcs/pull-requests";
export const typeDefinitions = {
    ...vcsPullRequests
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
