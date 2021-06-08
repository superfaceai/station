import { TypedProfile } from '@superfaceai/one-sdk';

export declare type VcsSingleFileContentSingleFileContentInput = {
    /** Owner of the repository **/
    owner: string;
    /** Repository name **/
    repo: string;
    /** Path to file at repository **/
    path: string;
    /** Branch eg. main **/
    ref: string;
};
export declare type VcsSingleFileContentSingleFileContentResult = {
    /** Size of content according to used provider **/
    size: number;
    /** Content of file **/
    content: string;
    /** Used encoding **/
    encoding: string;
};
declare const profile: {
    /**
     * Get Single File Content
     * Get the content of the specified file.
     **/
    SingleFileContent: [VcsSingleFileContentSingleFileContentInput, VcsSingleFileContentSingleFileContentResult];
};
export declare type VcsSingleFileContentProfile = TypedProfile<typeof profile>;
export declare const vcsSingleFileContent: {
    "vcs/single-file-content": {
        /**
         * Get Single File Content
         * Get the content of the specified file.
         **/
        SingleFileContent: [VcsSingleFileContentSingleFileContentInput, VcsSingleFileContentSingleFileContentResult];
    };
};
export {};
