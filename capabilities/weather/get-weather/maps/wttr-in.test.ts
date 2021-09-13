// import { SuperfaceClient } from '../../../../superface/sdk';
//
// describe('weather/get-weather/wttr-in-typed', () => {
//   beforeAll(() => {
//     jest.setTimeout(10000)
//   })
//
//   it('performs correctly', async () => {
//     const client = new SuperfaceClient();
//     const profile = await client.getProfile('weather/get-weather');
//     const provider = await client.getProvider('wttr-in');
//     const usecase = profile.useCases.GetWeather;
//
//     expect(provider).not.toBeUndefined();
//     expect(usecase).not.toBeUndefined();
//
//     const result = await usecase.perform({city: 'Prague,CZ'}, { provider });
//     expect(typeof result.unwrap().temperature).toBe('number')
//     expect(typeof result.unwrap().feels_like).toBe('number')
//     expect(typeof result.unwrap().description).toBe('string')
//   });
// });

import {getWeatherTest} from "./get-weather";

getWeatherTest('wttr-in')
