import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type ShipmentInfoInput = {
    /**
     * Shipment tracking number
     * Identifier of shipment
     **/
    trackingNumber: string;
    /**
     * Carrier
     * Shipment carrier identification
     **/
    carrier?: string;
};
export type ShipmentInfoResult = {
    /**
     * Carrier
     * Shipment carrier identification
     **/
    carrier: string;
    /**
     * Shipment tracking number
     * Identifier of shipment
     **/
    trackingNumber: string;
    origin: {
        address: {
            /**
             * Country code
             * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
             **/
            countryCode?: string;
            /**
             * Postal code
             * Text specifying the postal code for an address.
             **/
            postalCode?: string;
            /**
             * Address locality
             * Text specifying the name of the locality, for example a city.
             **/
            addressLocality?: string;
            /**
             * Street address
             * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
             **/
            streetAddress?: string;
        };
    };
    destination: {
        address: {
            /**
             * Country code
             * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
             **/
            countryCode?: string;
            /**
             * Postal code
             * Text specifying the postal code for an address.
             **/
            postalCode?: string;
            /**
             * Address locality
             * Text specifying the name of the locality, for example a city.
             **/
            addressLocality?: string;
            /**
             * Street address
             * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
             **/
            streetAddress?: string;
        };
    };
    status?: {
        timestamp: string;
        /**
         * Shipment status
         * Status of a shipment. Harmonized across different carriers.
         **/
        statusCode: 'pre_transit' | 'transit' | 'delivered' | 'failure' | 'unknown';
        statusText: string;
        location?: {
            address: {
                /**
                 * Country code
                 * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
                 **/
                countryCode?: string;
                /**
                 * Postal code
                 * Text specifying the postal code for an address.
                 **/
                postalCode?: string;
                /**
                 * Address locality
                 * Text specifying the name of the locality, for example a city.
                 **/
                addressLocality?: string;
                /**
                 * Street address
                 * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
                 **/
                streetAddress?: string;
            };
        };
    };
    events: {
        timestamp: string;
        /**
         * Shipment status
         * Status of a shipment. Harmonized across different carriers.
         **/
        statusCode: 'pre_transit' | 'transit' | 'delivered' | 'failure' | 'unknown';
        statusText: string;
        location?: {
            address: {
                /**
                 * Country code
                 * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
                 **/
                countryCode?: string;
                /**
                 * Postal code
                 * Text specifying the postal code for an address.
                 **/
                postalCode?: string;
                /**
                 * Address locality
                 * Text specifying the name of the locality, for example a city.
                 **/
                addressLocality?: string;
                /**
                 * Street address
                 * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
                 **/
                streetAddress?: string;
            };
        };
    }[];
    /** Estimated date and time of delivery **/
    estimatedDeliveryDate?: string;
}[];
const profile = {
    /** Get shipment state **/
    "shipmentInfo": typeHelper<ShipmentInfoInput, ShipmentInfoResult>()
};
export type DeliveryTrackingShipmentInfoProfile = TypedProfile<typeof profile>;
export const deliveryTrackingShipmentInfo = {
    "delivery-tracking/shipment-info": profile
};
