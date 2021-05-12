import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type NowInput = {
    coordinates: {
        /** Use degrees.minutes format. E.g. 50.0948541 **/
        longitude: number;
        /** Use degrees.minutes format. E.q. 14.4481567 **/
        latitude: number;
    };
    units?: 'imperial' | 'metric';
};
export type NowResult = {
    /** Flag indicating the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation. **/
    precipitation?: boolean;
    /** The amount of precipitation (liquid equivalent) that has fallen in the past hour. Depending on units input the value is in millimeters (metric units) or inches (imperial units). **/
    precipitationLastHour?: number;
    /** If precipitation is present, the type of precipitation will be returned. Possible values are rain, snow, ice, or mixed. **/
    precipitationType?: 'rain' | 'snow' | 'ice' | 'mixed';
};
const profile = {
    /** will-it-rain usecase **/
    "Now": typeHelper<NowInput, NowResult>()
};
export type WeatherWillItRainProfile = TypedProfile<typeof profile>;
export const weatherWillItRain = {
    "weather/will-it-rain": profile
};
