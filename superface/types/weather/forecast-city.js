"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherForecastCity = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Get Weather Forecast In City
     * Get weather forecast for the city in chosen units
     **/
    "GetWeatherForecastInCity": one_sdk_1.typeHelper()
};
exports.weatherForecastCity = {
    "weather/forecast-city": profile
};
