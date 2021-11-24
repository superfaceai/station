import { TypedProfile } from '@superfaceai/one-sdk';
export declare type AddressCleanAddressCleanAddressInput = {
    /**
     * Street
     * Street Address
     **/
    street?: unknown;
    /**
     * City
     * City or Town
     **/
    city?: unknown;
    /**
     * State
     * State or Province
     **/
    state?: unknown;
    /**
     * ZIP code
     * Zip or Postal code
     **/
    zipcode?: unknown;
};
export declare type AddressCleanAddressCleanAddressResult = {
    /**
     * Street
     * Street Address
     **/
    street?: unknown;
    /**
     * City
     * City or Town
     **/
    city?: unknown;
    /**
     * State
     * State or Province
     **/
    state?: unknown;
    /**
     * ZIP code
     * Zip or Postal code
     **/
    zipcode?: unknown;
};
declare const profile: {
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
    CleanAddress: [AddressCleanAddressCleanAddressInput, AddressCleanAddressCleanAddressResult];
};
export declare type AddressCleanAddressProfile = TypedProfile<typeof profile>;
export declare const addressCleanAddress: {
    "address/clean-address": {
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
        CleanAddress: [AddressCleanAddressCleanAddressInput, AddressCleanAddressCleanAddressResult];
    };
};
export {};
