"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityFaceDetection = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /** FaceDetection usecase **/
    "FaceDetection": one_sdk_1.typeHelper()
};
exports.identityFaceDetection = {
    "identity/face-detection": profile
};
