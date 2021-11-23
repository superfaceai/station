import { shipmentInfoTest } from './shipment-info';

shipmentInfoTest('dhl', [
  {
    input: {
      trackingNumber: '00340434292135100148',
    },
    describe: 'when all inputs are correct',
    expectedResult: 'should return shipment info as result',
  },
  {
    input: {
      trackingNumber: 'NOT_EXISTING_TRACKING_NUMBER',
    },
    describe: 'when inputs are invalid',
    expectedResult: 'should throw exception',
  },
]);
