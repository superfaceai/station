import { TypedProfile } from '@superfaceai/one-sdk';
export declare type TranslationAnalyzePlainTextSentimentAnalyzePlainTextSentimentInput = {
    /**
     * Text
     * The text to be analyzed.
     **/
    text: string;
    /**
     * Language code
     * The language of the text expressed as a ISO 639‑1 language code, e.g. 'en'.
     **/
    languageCode: string;
};
export declare type TranslationAnalyzePlainTextSentimentAnalyzePlainTextSentimentResult = {
    /**
     * Sentiment
     * The overal writer's attitude in the analyzed text.
     **/
    sentiment: 'positive' | 'neutral' | 'negative';
    /**
     * Score
     * Score of the sentiment ranges between -1.0 (negative) and 1.0 (positive) and corresponds to the overall emotional leaning of the text.
     **/
    score?: number;
};
declare const profile: {
    /**
     * Analyze plain text sentiment
     * Determines writer's attitude in the text as positive, negative, or neutral.
     **/
    AnalyzePlainTextSentiment: [TranslationAnalyzePlainTextSentimentAnalyzePlainTextSentimentInput, TranslationAnalyzePlainTextSentimentAnalyzePlainTextSentimentResult];
};
export declare type TranslationAnalyzePlainTextSentimentProfile = TypedProfile<typeof profile>;
export declare const translationAnalyzePlainTextSentiment: {
    "language/analyze-plain-text-sentiment": {
        /**
         * Analyze plain text sentiment
         * Determines writer's attitude in the text as positive, negative, or neutral.
         **/
        AnalyzePlainTextSentiment: [TranslationAnalyzePlainTextSentimentAnalyzePlainTextSentimentInput, TranslationAnalyzePlainTextSentimentAnalyzePlainTextSentimentResult];
    };
};
export {};
