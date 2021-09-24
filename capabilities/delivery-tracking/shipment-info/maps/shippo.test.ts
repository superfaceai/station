import { shipmentInfoTest } from './shipment-info';

shipmentInfoTest('shippo', [
  {
    input: {
      trackingNumber: 'SHIPPO_PRE_TRANSIT',
      carrier: 'shippo',
    },
    describe: 'when shipment is in pre transit',
    expectedResult: 'should return valid shipment info as result',
  },
  {
    input: {
      trackingNumber: 'SHIPPO_TRANSIT',
      carrier: 'shippo',
    },
    describe: 'when shipment is in transit',
    expectedResult: 'should return valid shipment info as result',
  },
  {
    input: {
      trackingNumber: 'SHIPPO_DELIVERED',
      carrier: 'shippo',
    },
    describe: 'when shipment is delivered',
    expectedResult: 'should return valid shipment info as result',
  },
  {
    input: {
      trackingNumber: 'SHIPPO_RETURNED',
      carrier: 'shippo',
    },
    describe: 'when shipment is returned',
    expectedResult: 'should return valid shipment info as result',
  },
  {
    input: {
      trackingNumber: 'SHIPPO_UNKNOWN',
      carrier: 'shippo',
    },
    describe: 'when shipment status is unknown',
    expectedResult: 'should return valid shipment info as result',
  },
]);
