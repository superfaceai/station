import { TypedProfile,typeHelper } from '@superfaceai/one-sdk';

export type DeliveryTrackingShipmentInfoShipmentInfoInput = {
    /**
     * Shipment tracking number
     * Identifier of shipment
     **/
    trackingNumber: string | null;
    /**
     * Carrier
     * Shipment carrier identification
     **/
    carrier?: string | null;
};
export type DeliveryTrackingShipmentInfoShipmentInfoResult = {
    /**
     * Carrier
     * Shipment carrier identification
     **/
    carrier: string | null;
    /**
     * Shipment tracking number
     * Identifier of shipment
     **/
    trackingNumber: string | null;
    origin: {
        address: {
            /**
             * Country code
             * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
             **/
            countryCode?: string | null;
            /**
             * Postal code
             * Text specifying the postal code for an address.
             **/
            postalCode?: string | null;
            /**
             * Address locality
             * Text specifying the name of the locality, for example a city.
             **/
            addressLocality?: string | null;
            /**
             * Street address
             * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
             **/
            streetAddress?: string | null;
        };
    };
    destination: {
        address: {
            /**
             * Country code
             * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
             **/
            countryCode?: string | null;
            /**
             * Postal code
             * Text specifying the postal code for an address.
             **/
            postalCode?: string | null;
            /**
             * Address locality
             * Text specifying the name of the locality, for example a city.
             **/
            addressLocality?: string | null;
            /**
             * Street address
             * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
             **/
            streetAddress?: string | null;
        };
    };
    status?: {
        timestamp: string | null;
        /**
         * Shipment status
         * Status of a shipment. Harmonized across different carriers.
         **/
        statusCode: 'pre_transit' | 'transit' | 'delivered' | 'failure' | 'unknown';
        statusText: string | null;
        location?: {
            address: {
                /**
                 * Country code
                 * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
                 **/
                countryCode?: string | null;
                /**
                 * Postal code
                 * Text specifying the postal code for an address.
                 **/
                postalCode?: string | null;
                /**
                 * Address locality
                 * Text specifying the name of the locality, for example a city.
                 **/
                addressLocality?: string | null;
                /**
                 * Street address
                 * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
                 **/
                streetAddress?: string | null;
            };
        };
    };
    events: {
        timestamp: string | null;
        /**
         * Shipment status
         * Status of a shipment. Harmonized across different carriers.
         **/
        statusCode: 'pre_transit' | 'transit' | 'delivered' | 'failure' | 'unknown';
        statusText: string | null;
        location?: {
            address: {
                /**
                 * Country code
                 * A short text string code (ISO 3166-1 alpha-2 country code) specifying the country.
                 **/
                countryCode?: string | null;
                /**
                 * Postal code
                 * Text specifying the postal code for an address.
                 **/
                postalCode?: string | null;
                /**
                 * Address locality
                 * Text specifying the name of the locality, for example a city.
                 **/
                addressLocality?: string | null;
                /**
                 * Street address
                 * The street address expressed as free form text. The street address is printed on paper as the first lines below the name.
                 **/
                streetAddress?: string | null;
            };
        };
    }[];
    /** Estimated date and time of delivery **/
    estimatedDeliveryDate?: string | null;
}[];
const profile = {
    /**
     * Retrieve Shipment Status
     * Get the actual shipment status.
     **/
    "ShipmentInfo": typeHelper<DeliveryTrackingShipmentInfoShipmentInfoInput, DeliveryTrackingShipmentInfoShipmentInfoResult>()
};
export type DeliveryTrackingShipmentInfoProfile = TypedProfile<typeof profile>;
export const deliveryTrackingShipmentInfo = {
    "delivery-tracking/shipment-info": profile
};
