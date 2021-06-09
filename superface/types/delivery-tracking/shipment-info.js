"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryTrackingShipmentInfo = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Retrieve Shipment Status
     * Get the actual shipment status.
     **/
    "ShipmentInfo": one_sdk_1.typeHelper()
};
exports.deliveryTrackingShipmentInfo = {
    "delivery-tracking/shipment-info": profile
};
