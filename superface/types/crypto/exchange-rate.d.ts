import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CryptoExchangeRateGetExchangeRateInput = {
    /**
     * From
     * Code of the source currency, e.g.: "ETH"
     **/
    from: string;
    /**
     * To
     * Code of the target currency, e.g.: "BTC"
     **/
    to: string;
};
export declare type CryptoExchangeRateGetExchangeRateResult = {
    /**
     * Rate
     * Exchange rate, e.g.: "0.06249100"
     **/
    rate: string;
};
declare const profile: {
    /**
     * Get Exchange Rate
     * Get exchange rate of two currencies
     **/
    GetExchangeRate: [CryptoExchangeRateGetExchangeRateInput, CryptoExchangeRateGetExchangeRateResult];
};
export declare type CryptoExchangeRateProfile = TypedProfile<typeof profile>;
export declare const cryptoExchangeRate: {
    "crypto/exchange-rate": {
        /**
         * Get Exchange Rate
         * Get exchange rate of two currencies
         **/
        GetExchangeRate: [CryptoExchangeRateGetExchangeRateInput, CryptoExchangeRateGetExchangeRateResult];
    };
};
export {};
