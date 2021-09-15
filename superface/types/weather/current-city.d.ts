import { TypedProfile } from '@superfaceai/one-sdk';

export declare type WeatherCurrentCityGetCurrentWeatherInCityInput = {
    /**
     * city
     * Name of the city
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
     * Description of weather
     **/
    description?: string;
};
declare const profile: {
    /**
     * Get Current Weather In City
     * Get current weather for the city and in chosen units.
     **/
    GetCurrentWeatherInCity: [WeatherCurrentCityGetCurrentWeatherInCityInput, WeatherCurrentCityGetCurrentWeatherInCityResult];
};
export declare type WeatherCurrentCityProfile = TypedProfile<typeof profile>;
export declare const weatherCurrentCity: {
    "weather/current-city": {
        /**
         * Get Current Weather In City
         * Get current weather for the city and in chosen units.
         **/
        GetCurrentWeatherInCity: [WeatherCurrentCityGetCurrentWeatherInCityInput, WeatherCurrentCityGetCurrentWeatherInCityResult];
    };
};
export {};
