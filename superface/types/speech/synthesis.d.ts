import { TypedProfile } from '@superfaceai/one-sdk';
export declare type SpeechSynthesisTextToSpeechSynthesisInput = {
    text: string | null;
    voice: {
        /** The language (and potentially also the region) of the voice expressed as a BCP-47 language tag, e.g. 'en-US'. **/
        languageCode: string | null;
        /** The name of the voice. **/
        name?: string | null;
    };
    audio: {
        /** The format of the audio byte stream. **/
        encoding: 'mp3' | 'linear_pcm';
        /** The synthesis sample rate (in hertz) for this audio. Selected sample rate has to be supported by selected audio encoding format. **/
        sampleRateHertz?: number | null;
    };
};
export declare type SpeechSynthesisTextToSpeechSynthesisResult = {
    /** Synthesised audio data bytes encoded as specified in the audio params input. **/
    audioContent?: unknown;
};
declare const profile: {
    /** Text to speech synthesis usecase **/
    TextToSpeechSynthesis: [SpeechSynthesisTextToSpeechSynthesisInput, SpeechSynthesisTextToSpeechSynthesisResult];
};
export declare type SpeechSynthesisProfile = TypedProfile<typeof profile>;
export declare const speechSynthesis: {
    "speech/synthesis": {
        /** Text to speech synthesis usecase **/
        TextToSpeechSynthesis: [SpeechSynthesisTextToSpeechSynthesisInput, SpeechSynthesisTextToSpeechSynthesisResult];
    };
};
export {};
