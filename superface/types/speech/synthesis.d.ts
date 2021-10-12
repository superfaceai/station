import { TypedProfile } from '@superfaceai/one-sdk';
export declare type SpeechSynthesisTextToSpeechSynthesisInput = {
    /**
     * Text
     * The text input to be synthesized.
     **/
    text: string;
    /**
     * Voice
     * Voice selection options.
     **/
    voice: {
        /**
         * Language code
         * The language (and potentially also the region) of the voice expressed as a BCP-47 language tag, e.g. 'en-US'.
         **/
        languageCode: string | null;
        /**
         * Voice name
         * The name of the voice.
         **/
        name?: string;
    };
    /**
     * Audio
     * Audio format options.
     **/
    audio: {
        /**
         * Audio encoding
         * The format of the audio byte stream.
         **/
        encoding: 'mp3' | 'linear_pcm';
        /**
         * Sample rate
         * The synthesis sample rate in hertz for the audio. Selected sample rate has to be supported by selected audio encoding format.
         **/
        sampleRateHertz?: number;
    };
};
export declare type SpeechSynthesisTextToSpeechSynthesisResult = {
    /**
     * Audio content
     * Synthesised audio data bytes encoded as specified in the audio options input.
     **/
    audioContent: unknown;
};
declare const profile: {
    /**
     * Text to speech synthesis
     * Convert text into speech synchronously.
     **/
    TextToSpeechSynthesis: [SpeechSynthesisTextToSpeechSynthesisInput, SpeechSynthesisTextToSpeechSynthesisResult];
};
export declare type SpeechSynthesisProfile = TypedProfile<typeof profile>;
export declare const speechSynthesis: {
    "speech/synthesis": {
        /**
         * Text to speech synthesis
         * Convert text into speech synchronously.
         **/
        TextToSpeechSynthesis: [SpeechSynthesisTextToSpeechSynthesisInput, SpeechSynthesisTextToSpeechSynthesisResult];
    };
};
export {};
