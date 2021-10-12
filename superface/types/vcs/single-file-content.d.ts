import { TypedProfile } from '@superfaceai/one-sdk';
export declare type VcsSingleFileContentSingleFileContentInput = {
    /**
     * Owner
     * Owner of the repository
     **/
    owner: string;
    /**
     * Repo
     * Repository name
     **/
    repo: string;
    /**
     * Path
     * Path to file at repository
     **/
    path: string;
    /**
     * Ref
     * Branch eg. main
     **/
    ref: string;
};
export declare type VcsSingleFileContentSingleFileContentResult = {
    /**
     * Size
     * Size of content according to used provider
     **/
    size: number;
    /**
     * Content
     * Content of file
     **/
    content: string;
    /**
     * Encoding
     * Used encoding
     **/
    encoding: string;
};
declare const profile: {
    /**
     * Single File Content
     * Get the content of the specified file.
     **/
    SingleFileContent: [VcsSingleFileContentSingleFileContentInput, VcsSingleFileContentSingleFileContentResult];
};
export declare type VcsSingleFileContentProfile = TypedProfile<typeof profile>;
export declare const vcsSingleFileContent: {
    "vcs/single-file-content": {
        /**
         * Single File Content
         * Get the content of the specified file.
         **/
        SingleFileContent: [VcsSingleFileContentSingleFileContentInput, VcsSingleFileContentSingleFileContentResult];
    };
};
export {};
