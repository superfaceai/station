import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type RetrieveCharacterInformationInput = {
    /**
     * Character name
     * The character name to use when looking up character information
     **/
    characterName?: string | null;
};
export type RetrieveCharacterInformationResult = {
    /**
     * Height
     * The height of the character
     **/
    height?: string | null;
    /**
     * Weight
     * The weight of the character
     **/
    weight?: string | null;
    /**
     * Year of birth
     * The year of birth of the character
     **/
    yearOfBirth?: string | null;
};
const profile = {
    /**
     * Retrieve Character Info
     * Retrieve information about a Star Wars character.
     **/
    "RetrieveCharacterInformation": typeHelper<RetrieveCharacterInformationInput, RetrieveCharacterInformationResult>()
};
export type StarwarsCharacterInformationProfile = TypedProfile<typeof profile>;
export const starwarsCharacterInformation = {
    "starwars/character-information": profile
};
