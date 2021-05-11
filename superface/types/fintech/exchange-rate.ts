import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type GetRatesInput = {
    from?: string;
    to?: string[];
    date?: unknown;
};
export type GetRatesResult = {
    base?: string;
    date?: unknown;
    rates?: {
        key?: string;
        value?: number;
    }[];
};
const profile = {
    "GetRates": typeHelper<GetRatesInput, GetRatesResult>()
};
export type FintechExchangeRateProfile = TypedProfile<typeof profile>;
export const fintechExchangeRate = {
    "fintech/exchange-rate": profile
};
