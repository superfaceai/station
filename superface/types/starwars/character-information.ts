import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
/** Retrieve information about Star Wars characters from the Star Wars API. **/
export interface RetrieveCharacterInformationInput {
    characterName?: unknown;
}
/** Retrieve information about Star Wars characters from the Star Wars API. **/
export interface RetrieveCharacterInformationResult {
    height?: unknown;
    weight?: unknown;
    yearOfBirth?: unknown;
}
export const profile = {
    "RetrieveCharacterInformation": typeHelper<RetrieveCharacterInformationInput, RetrieveCharacterInformationResult>()
};
export type StarwarsCharacterInformationProfile = TypedProfile<typeof profile>;
export const starwarsCharacterInformation = {
    "starwars/character-information": profile
};
