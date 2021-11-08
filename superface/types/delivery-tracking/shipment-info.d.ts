import { TypedProfile } from '@superfaceai/one-sdk';
export declare type DeliveryTrackingShipmentInfoShipmentInfoInput = {
    /**
     * Shipment tracking number
     * The identifier of shipment.
     **/
    trackingNumber: string;
    /**
     * Carrier
     * The shipment carrier identification to narrow down the results.
     **/
    carrier?: string;
};
export declare type DeliveryTrackingShipmentInfoShipmentInfoResult = {
    /**
     * Carrier
     * The name of the carrier responsible for delivery.
     **/
    carrier: string | null;
    /**
     * Status
     * The latest shipment event.
     **/
    status: {
        /**
         * Timestamp
         * The date and time in ISO 8601 format of the event.
         **/
        timestamp: string | null;
        /**
         * Shipment status
         * The shipment status of the event.
         **/
        statusCode: 'pre_transit' | 'transit' | 'delivered' | 'failure' | 'unknown';
        /**
         * Status
         * A description of the current shipment status.
         **/
        statusText: string | null;
        /**
         * Location
         * The location of the shipment.
         **/
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
    /**
     * Origin
     * A postal address with the origin of the shipment.
     **/
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
    /**
     * Shipment tracking number
     * The identifier of shipment.
     **/
    trackingNumber: string | null;
    /**
     * Destination
     * A postal shipping address.
     **/
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
    /**
     * Events
     * A list of delivery tracking events.
     **/
    events: {
        /**
         * Timestamp
         * The date and time in ISO 8601 format of the event.
         **/
        timestamp: string | null;
        /**
         * Shipment status
         * The shipment status of the event.
         **/
        statusCode: 'pre_transit' | 'transit' | 'delivered' | 'failure' | 'unknown';
        /**
         * Status
         * A description of the current shipment status.
         **/
        statusText: string | null;
        /**
         * Location
         * The location of the shipment.
         **/
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
    /**
     * Estimated delivery date
     * Estimated date and time of delivery.
     **/
    estimatedDeliveryDate: string | null;
}[];
declare const profile: {
    /**
     * Retrieve Shipment Status
     * Get the current shipment status.
     **/
    ShipmentInfo: [DeliveryTrackingShipmentInfoShipmentInfoInput, DeliveryTrackingShipmentInfoShipmentInfoResult];
};
export declare type DeliveryTrackingShipmentInfoProfile = TypedProfile<typeof profile>;
export declare const deliveryTrackingShipmentInfo: {
    "delivery-tracking/shipment-info": {
        /**
         * Retrieve Shipment Status
         * Get the current shipment status.
         **/
        ShipmentInfo: [DeliveryTrackingShipmentInfoShipmentInfoInput, DeliveryTrackingShipmentInfoShipmentInfoResult];
    };
};
export {};
