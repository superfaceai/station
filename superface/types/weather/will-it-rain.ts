import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type NowInput = {
    coordinates: {
        /** Use degrees.minutes format. E.g. 50.0948541 **/
        longitude: number;
        /** Use degrees.minutes format. E.q. 14.4481567 **/
        latitude: number;
    };
    units?: 'Imperial' | 'Metric';
};
export type NowResult = {
    chance?: unknown;
    precipitation?: unknown;
    type?: 'Rain' | 'Snow';
};
const profile = {
    /** will-it-rain usecase **/
    "Now": typeHelper<NowInput, NowResult>()
};
export type WeatherWillItRainProfile = TypedProfile<typeof profile>;
export const weatherWillItRain = {
    "weather/will-it-rain": profile
};
