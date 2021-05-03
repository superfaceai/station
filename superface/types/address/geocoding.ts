import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type GecodeInput = {
    /**
     * Country
     * The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.
     **/
    addressCountry?: unknown;
    /**
     * Locality
     * The locality in which the street address is, and which is in the region. For example, Mountain View.
     **/
    addressLocality?: unknown;
    /**
     * Region
     * The region in which the locality is, and which is in the country. For example, California or another appropriate first-level Administrative division
     **/
    addressRegion?: unknown;
    /**
     * Postal code
     * The postal code. For example, 94043.
     **/
    postalCode?: unknown;
    /**
     * Street address
     * The street address. For example, 1600 Amphitheatre Pkwy.
     **/
    streetAddress?: unknown;
};
export type GecodeResult = {
    /**
     * Latitude
     * The latitude of a location. For example 37.42242 (WGS 84).
     **/
    latitude: unknown;
    /**
     * Longitude
     * The longitude of a location. For example -122.08585 (WGS 84).
     **/
    longitude: unknown;
};
export type ReverseGeocodeInput = {
    /**
     * Latitude
     * The latitude of a location. For example 37.42242 (WGS 84).
     **/
    latitude: unknown;
    /**
     * Longitude
     * The longitude of a location. For example -122.08585 (WGS 84).
     **/
    longitude: unknown;
};
export type ReverseGeocodeResult = {
    addresses?: {
        /**
         * Country
         * The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.
         **/
        addressCountry?: unknown;
        /**
         * Locality
         * The locality in which the street address is, and which is in the region. For example, Mountain View.
         **/
        addressLocality?: unknown;
        /**
         * Region
         * The region in which the locality is, and which is in the country. For example, California or another appropriate first-level Administrative division
         **/
        addressRegion?: unknown;
        /**
         * Postal code
         * The postal code. For example, 94043.
         **/
        postalCode?: unknown;
        /**
         * Street address
         * The street address. For example, 1600 Amphitheatre Pkwy.
         **/
        streetAddress?: unknown;
    }[];
};
const profile = {
    /**
     * Geocode address
     * Geocode postal address into geographical coordinates (latitude and longitude)
     **/
    "Gecode": typeHelper<GecodeInput, GecodeResult>(),
    /**
     * Reverse geocode
     * Decodes geographical coordinates (latitude and longitude) into postal addresses
     **/
    "ReverseGeocode": typeHelper<ReverseGeocodeInput, ReverseGeocodeResult>()
};
export type AddressGeocodingProfile = TypedProfile<typeof profile>;
export const addressGeocoding = {
    "address/geocoding": profile
};
