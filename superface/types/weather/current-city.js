"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherCurrentCity = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Get Current Weather In City
     * Get current weather for the city and in chosen units.
     **/
    "GetCurrentWeatherInCity": one_sdk_1.typeHelper()
};
exports.weatherCurrentCity = {
    "weather/current-city": profile
};
