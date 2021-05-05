import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type WillItRainInput = {
    city?: unknown;
    date?: unknown;
    units?: 'Imperial' | 'Metric';
};
export type WillItRainResult = {
    chance?: unknown;
    precipitation?: unknown;
    type?: 'Rain' | 'Snow';
};
const profile = {
    /** will-it-rain usecase **/
    "WillItRain": typeHelper<WillItRainInput, WillItRainResult>()
};
export type WeatherWillItRainProfile = TypedProfile<typeof profile>;
export const weatherWillItRain = {
    "weather/will-it-rain": profile
};
