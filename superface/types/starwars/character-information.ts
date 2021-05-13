import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type RetrieveCharacterInformationInput = {
    /**
     * Character name
     * The character name to use when looking up character information
     **/
    characterName?: string;
};
export type RetrieveCharacterInformationResult = {
    /**
     * Height
     * The height of the character
     **/
    height?: string;
    /**
     * Weight
     * The weight of the character
     **/
    weight?: string;
    /**
     * Year of birth
     * The year of birth of the character
     **/
    yearOfBirth?: string;
};
const profile = {
    /** Retrieve information about Star Wars characters from the Star Wars API. **/
    "RetrieveCharacterInformation": typeHelper<RetrieveCharacterInformationInput, RetrieveCharacterInformationResult>()
};
export type StarwarsCharacterInformationProfile = TypedProfile<typeof profile>;
export const starwarsCharacterInformation = {
    "starwars/character-information": profile
};
