import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';

/** Get shipment state **/
export interface ShipmentInfoInput {
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
}
export interface ShipmentInfoResultItem {
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

  origin: any;
  destination: any;
  status?: any;
  events: [any];

  /**
   * Estimated date and time of delivery
   **/
  estimatedDeliveryDate: string;
}

export interface ShipmentInfoResult {
   [index: number]: ShipmentInfoResultItem;
}

export const profile = {
    "shipmentInfo": typeHelper<ShipmentInfoInput, ShipmentInfoResult>()
};

export type DeliveryTrackingShipmentInfoProfile = TypedProfile<typeof profile>;

export const deliveryTrackingShipmentInfo = {
    "delivery-tracking/shipment-info": profile
};
