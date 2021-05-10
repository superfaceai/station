import { createTypedClient } from '@superfaceai/one-sdk';

import { vcsSingleFileContent } from './types/vcs/single-file-content';

export { VcsSingleFileContentProfile } from "./types/vcs/single-file-content";
export const typeDefinitions = {
    ...vcsSingleFileContent
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
