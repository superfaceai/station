import { TypedProfile } from '@superfaceai/one-sdk';
export declare type IdentityFaceDetectionFaceDetectionInput = {
    imageUrl: string;
    instance?: string;
};
export declare type IdentityFaceDetectionFaceDetectionResult = {
    faces?: {
        faceRectangle: {
            topLeft: {
                x: number;
                y: number;
            };
            topRight: {
                x: number;
                y: number;
            };
            bottomLeft: {
                x: number;
                y: number;
            };
            bottomRight: {
                x: number;
                y: number;
            };
        };
        landmarks: {
            kind: 'leftPupil' | 'eyeLeftOuter' | 'eyeLeftTop' | 'eyeLeftBottom' | 'eyeLeftInner' | 'rightPupil' | 'eyeRightOuter' | 'eyeRightTop' | 'eyeRightBottom' | 'eyeRightInner' | 'eyebrowLeftOuter' | 'eyebrowLeftInner' | 'eyebrowRightInner' | 'eyebrowRightOuter' | 'noseTip' | 'noseRootLeft' | 'noseRootRight' | 'mouthLeft' | 'mouthRight';
            x: number;
            y: number;
        }[];
        emotions: {
            happiness: 'unknown' | 'veryUnlikely' | 'unlikely' | 'possible' | 'likely' | 'veryLikely';
            anger: 'unknown' | 'veryUnlikely' | 'unlikely' | 'possible' | 'likely' | 'veryLikely';
            sadness: 'unknown' | 'veryUnlikely' | 'unlikely' | 'possible' | 'likely' | 'veryLikely';
            surprise: 'unknown' | 'veryUnlikely' | 'unlikely' | 'possible' | 'likely' | 'veryLikely';
        };
    }[];
}[];
declare const profile: {
    /** FaceDetection usecase **/
    FaceDetection: [IdentityFaceDetectionFaceDetectionInput, IdentityFaceDetectionFaceDetectionResult];
};
export declare type IdentityFaceDetectionProfile = TypedProfile<typeof profile>;
export declare const identityFaceDetection: {
    "identity/face-detection": {
        /** FaceDetection usecase **/
        FaceDetection: [IdentityFaceDetectionFaceDetectionInput, IdentityFaceDetectionFaceDetectionResult];
    };
};
export {};
