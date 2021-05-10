import { createTypedClient } from '@superfaceai/one-sdk';

import { deliveryTrackingShipmentInfo } from './types/delivery-tracking/shipment-info';

export { DeliveryTrackingShipmentInfoProfile } from "./types/delivery-tracking/shipment-info";
export const typeDefinitions = {
    ...deliveryTrackingShipmentInfo
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
