import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type AddressCleanAddressCleanAddressInput = {
    street?: unknown;
    city?: unknown;
    state?: unknown;
    zipcode?: unknown;
};
export type AddressCleanAddressCleanAddressResult = {
    street?: unknown;
    city?: unknown;
    state?: unknown;
    zipcode?: unknown;
};
const profile = {
    /**
     * Clean Address
     * This use case will take an address like:
     *
     * {
     *   street: '3301 South Greenfield Road',
     *   city: 'Gilbert',
     *   state: 'AZ',
     *   zipcode: '85297',
     * }
     *
     * And convert it to:
     *
     * {
     *   city: 'Gilbert',
     *   state: 'AZ',
     *   street: '3301 S Greenfield Rd',
     *   zipcode: '85297',
     * }
     *
     * This is useful for cleaning up addresses input by users.
     **/
    "CleanAddress": typeHelper<AddressCleanAddressCleanAddressInput, AddressCleanAddressCleanAddressResult>()
};
export type AddressCleanAddressProfile = TypedProfile<typeof profile>;
export const addressCleanAddress = {
    "address/clean-address": profile
};
