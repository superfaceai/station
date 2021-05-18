import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type SingleFileContentInput = {
    owner?: string;
    repo?: string;
    path?: string;
    ref?: string;
};
export type SingleFileContentResult = {
    size?: number;
    content?: string;
    encoding?: string;
};
const profile = {
    /** single-file-content usecase **/
    "SingleFileContent": typeHelper<SingleFileContentInput, SingleFileContentResult>()
};
export type VcsSingleFileContentProfile = TypedProfile<typeof profile>;
export const vcsSingleFileContent = {
    "vcs/single-file-content": profile
};
