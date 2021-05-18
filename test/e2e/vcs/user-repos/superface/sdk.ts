import { createTypedClient } from "@superfaceai/one-sdk";

import { vcsUserRepos } from "./types/vcs/user-repos";

export { VcsUserReposProfile } from "./types/vcs/user-repos";
export const typeDefinitions = {
  ...vcsUserRepos
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
