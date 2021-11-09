"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computerVisionFaceDetection = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Face Detection
     * Detects faces on publicly-accessible image URL
     **/
    "FaceDetection": one_sdk_1.typeHelper()
};
exports.computerVisionFaceDetection = {
    "computer-vision/face-detection": profile
};
