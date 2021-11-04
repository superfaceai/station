import { TypedProfile } from '@superfaceai/one-sdk';
export declare type ComputerVisionFaceDetectionFaceDetectionInput = {
    /**
     * Image URL
     * Publicly-accessible image URL
     **/
    imageUrl: string;
};
export declare type ComputerVisionFaceDetectionFaceDetectionResult = {
    faces: {
        faceRectangle: {
            topLeft: {
                x?: number | null;
                y?: number | null;
            };
            topRight: {
                x?: number | null;
                y?: number | null;
            };
            bottomLeft: {
                x?: number | null;
                y?: number | null;
            };
            bottomRight: {
                x?: number | null;
                y?: number | null;
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
    /**
     * Face Detection
     * Detects faces on publicly-accessible image URL
     **/
    FaceDetection: [ComputerVisionFaceDetectionFaceDetectionInput, ComputerVisionFaceDetectionFaceDetectionResult];
};
export declare type ComputerVisionFaceDetectionProfile = TypedProfile<typeof profile>;
export declare const computerVisionFaceDetection: {
    "computer-vision/face-detection": {
        /**
         * Face Detection
         * Detects faces on publicly-accessible image URL
         **/
        FaceDetection: [ComputerVisionFaceDetectionFaceDetectionInput, ComputerVisionFaceDetectionFaceDetectionResult];
    };
};
export {};
