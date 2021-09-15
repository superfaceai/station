import { TypedProfile } from '@superfaceai/one-sdk';
export declare type WeatherForecastCityGetWeatherForecastInCityInput = {
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
export declare type WeatherForecastCityGetWeatherForecastInCityResult = {
    /**
     * temperature
     * Temperature in specified units
     **/
    temperature: number;
    /**
     * date
     * Date of the forecast
     **/
    date: string;
    /**
     * maxTemperature
     * Daily maximal Temperature
     **/
    maxTemperature?: number;
    /**
     * minTemperature
     * Datily minimal temperature
     **/
    minTemperature?: number;
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
}[];
declare const profile: {
    /**
     * Get Weather Forecast In City
     * Get weather forecast for the city in chosen units
     **/
    GetWeatherForecastInCity: [WeatherForecastCityGetWeatherForecastInCityInput, WeatherForecastCityGetWeatherForecastInCityResult];
};
export declare type WeatherForecastCityProfile = TypedProfile<typeof profile>;
export declare const weatherForecastCity: {
    "weather/forecast-city": {
        /**
         * Get Weather Forecast In City
         * Get weather forecast for the city in chosen units
         **/
        GetWeatherForecastInCity: [WeatherForecastCityGetWeatherForecastInCityInput, WeatherForecastCityGetWeatherForecastInCityResult];
    };
};
export {};
