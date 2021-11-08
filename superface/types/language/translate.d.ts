import { TypedProfile } from '@superfaceai/one-sdk';
export declare type LanguageTranslateTranslateTextInput = {
    /** Text **/
    text?: string | null;
    /**
     * Target language
     * Language that specified text is translated into
     **/
    targetLanguage?: 'BG' | 'CS' | 'DA' | 'DE' | 'EL' | 'EN-GB' | 'EN-US' | 'EN' | 'ES' | 'ET' | 'FI' | 'FR' | 'HU' | 'IT' | 'JA' | 'LT' | 'LV' | 'NL' | 'PL' | 'PT-PT' | 'PT-BR' | 'PT' | 'RO' | 'RU' | 'SK' | 'SL' | 'SV' | 'ZH';
    /**
     * Source language
     * Language of specified text
     **/
    sourceLanguage?: 'BG' | 'CS' | 'DA' | 'DE' | 'EL' | 'EN' | 'ES' | 'ET' | 'FI' | 'FR' | 'HU' | 'IT' | 'JA' | 'LT' | 'LV' | 'NL' | 'PL' | 'PT' | 'RO' | 'RU' | 'SK' | 'SL' | 'SV' | 'ZH';
};
export declare type LanguageTranslateTranslateTextResult = {
    /** Text **/
    text?: string | null;
    /**
     * Source language
     * Language of specified text
     **/
    sourceLanguage?: 'BG' | 'CS' | 'DA' | 'DE' | 'EL' | 'EN' | 'ES' | 'ET' | 'FI' | 'FR' | 'HU' | 'IT' | 'JA' | 'LT' | 'LV' | 'NL' | 'PL' | 'PT' | 'RO' | 'RU' | 'SK' | 'SL' | 'SV' | 'ZH';
};
declare const profile: {
    /**
     * Translate text usecase
     * Translate text to another language
     **/
    TranslateText: [LanguageTranslateTranslateTextInput, LanguageTranslateTranslateTextResult];
};
export declare type LanguageTranslateProfile = TypedProfile<typeof profile>;
export declare const languageTranslate: {
    "language/translate": {
        /**
         * Translate text usecase
         * Translate text to another language
         **/
        TranslateText: [LanguageTranslateTranslateTextInput, LanguageTranslateTranslateTextResult];
    };
};
export {};
