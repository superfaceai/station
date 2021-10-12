import { TypedProfile } from '@superfaceai/one-sdk';
export declare type WeatherCurrentCityGetCurrentWeatherInCityInput = {
    /**
     * city
     * Name of the city including state and country, e.g.: "Prague, Czech Republic" or "New York City, NY, USA"
     **/
    city: string;
    /**
     * units
     * Units used to represent temperature - Fahrenheit, Celsius, Kelvin
     * Celsius by default
     **/
    units?: 'C' | 'F' | 'K';
};
export declare type WeatherCurrentCityGetCurrentWeatherInCityResult = {
    /**
     * temperature
     * Temperature in specified units
     **/
    temperature: number;
    /**
     * feelsLike
     * Subjective temperature in specified units
     **/
    feelsLike?: number;
    /**
     * description
     * Text description of weather, e.g. "Partly cloudy"
     **/
    description?: string;
};
declare const profile: {
    /**
     * Get Current Weather In City
     * Get current weather in the city in chosen units.
     **/
    GetCurrentWeatherInCity: [WeatherCurrentCityGetCurrentWeatherInCityInput, WeatherCurrentCityGetCurrentWeatherInCityResult];
};
export declare type WeatherCurrentCityProfile = TypedProfile<typeof profile>;
export declare const weatherCurrentCity: {
    "weather/current-city": {
        /**
         * Get Current Weather In City
         * Get current weather in the city in chosen units.
         **/
        GetCurrentWeatherInCity: [WeatherCurrentCityGetCurrentWeatherInCityInput, WeatherCurrentCityGetCurrentWeatherInCityResult];
    };
};
export {};
