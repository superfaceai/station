import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type VcsSingleFileContentSingleFileContentInput = {
    /** Owner of the repository **/
    owner: string;
    /** Repository name **/
    repo: string;
    /** Path to file at repository **/
    path: string;
    /** Branch eg. main **/
    ref: string;
};
export type VcsSingleFileContentSingleFileContentResult = {
    /** Size of content according to used provider **/
    size: number;
    /** Content of file **/
    content: string;
    /** Used encoding **/
    encoding: string;
};
const profile = {
    /**
     * Get Single File Content
     * Get the content of the specified file.
     **/
    "SingleFileContent": typeHelper<VcsSingleFileContentSingleFileContentInput, VcsSingleFileContentSingleFileContentResult>()
};
export type VcsSingleFileContentProfile = TypedProfile<typeof profile>;
export const vcsSingleFileContent = {
    "vcs/single-file-content": profile
};
