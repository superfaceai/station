import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';
/** single-file-content usecase **/
export interface SingleFileContentInput {
  owner?: unknown;
  repo?: unknown;
  path?: unknown;
  ref?: unknown;
}
/** single-file-content usecase **/
export interface SingleFileContentResult {
  size?: unknown;
  content?: unknown;
  encoding?: unknown;
}
const profile = {
  "SingleFileContent": typeHelper<SingleFileContentInput, SingleFileContentResult>()
};
export type VcsSingleFileContentProfile = TypedProfile<typeof profile>;
export const vcsSingleFileContent = {
  "vcs/single-file-content": profile
};
