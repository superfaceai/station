import { TypedProfile } from '@superfaceai/one-sdk';
export declare type WeatherForecastCityGetWeatherForecastInCityInput = {
    /**
     * City
     * Name of the city including state and country, e.g.: "Prague, Czech Republic" or "New York City, NY, USA"
     **/
    city: string;
    /**
     * Units
     * Units used to represent temperature - Fahrenheit, Celsius, Kelvin;
     * Celsius by default
     **/
    units?: 'C' | 'F' | 'K';
};
export declare type WeatherForecastCityGetWeatherForecastInCityResult = {
    /**
     * AverageTemperature
     * Daily average Temperature in specified units
     **/
    averageTemperature: number;
    /**
     * Date
     * Date of the weather forecast
     **/
    date: string;
    /**
     * MaxTemperature
     * Daily maximal temperature in specified units
     **/
    maxTemperature?: number;
    /**
     * MinTemperature
     * Datily minimal temperature in specified units
     **/
    minTemperature?: number;
}[];
declare const profile: {
    /**
     * Get Weather Forecast For City
     * Get weather forecast for the city in chosen units
     **/
    GetWeatherForecastInCity: [WeatherForecastCityGetWeatherForecastInCityInput, WeatherForecastCityGetWeatherForecastInCityResult];
};
export declare type WeatherForecastCityProfile = TypedProfile<typeof profile>;
export declare const weatherForecastCity: {
    "weather/forecast-city": {
        /**
         * Get Weather Forecast For City
         * Get weather forecast for the city in chosen units
         **/
        GetWeatherForecastInCity: [WeatherForecastCityGetWeatherForecastInCityInput, WeatherForecastCityGetWeatherForecastInCityResult];
    };
};
export {};
