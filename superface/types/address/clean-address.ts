import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type CleanAddressInput = {
    street?: unknown;
    city?: unknown;
    state?: unknown;
    zipcode?: unknown;
};
export type CleanAddressResult = {
    street?: unknown;
    city?: unknown;
    state?: unknown;
    zipcode?: unknown;
};
const profile = {
    /** clean-address usecase **/
    "CleanAddress": typeHelper<CleanAddressInput, CleanAddressResult>()
};
export type AddressCleanAddressProfile = TypedProfile<typeof profile>;
export const addressCleanAddress = {
    "address/clean-address": profile
};
