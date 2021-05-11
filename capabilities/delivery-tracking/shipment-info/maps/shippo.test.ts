import { SuperfaceClient } from '../../../../superface/sdk';

describe('delivery-tracking/shipment-info/shippo', () => {
  it('should define use-case and provider', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('delivery-tracking/shipment-info');
    const useCase = profile.getUseCase('shipmentInfo');
    const provider = await client.getProvider('shippo');

    expect(useCase).not.toBeUndefined();
    expect(provider).not.toBeUndefined();
  });

  describe('for tracking number in pre-transit', () => {
    let shipment: any;
    beforeAll(async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile(
        'delivery-tracking/shipment-info'
      );
      const shippo = await client.getProvider('shippo');
      const result = await profile.useCases.ShipmentInfo.perform(
        { carrier: 'shippo', trackingNumber: 'SHIPPO_PRE_TRANSIT' },
        { provider: shippo }
      );
      shipment = result.unwrap()[0];
    });

    it('should return valid origin location', () => {
      expect(shipment.origin).toEqual({
        address: {
          addressLocality: 'San Francisco',
          countryCode: 'US',
          postalCode: '94103',
        },
      });
    });

    it('should return valid destination location', () => {
      expect(shipment.destination).toEqual({
        address: {
          addressLocality: 'Chicago',
          countryCode: 'US',
          postalCode: '60611',
        },
      });
    });

    it('should return valid status', () => {
      expect(shipment.status.statusCode).toBe('pre_transit');
      expect(shipment.status.statusText).toBe(
        'The carrier has received the electronic shipment information.'
      );
    });

    it('should return events', () => {
      expect(shipment.events.length).toBe(1);
    });
  });

  describe('for tracking number in transit', () => {
    let shipment: any;
    beforeAll(async () => {
      const client = new SuperfaceClient();
      const profile = await client.getProfile(
        'delivery-tracking/shipment-info'
      );
      const shippo = await client.getProvider('shippo');
      const result = await profile.useCases.ShipmentInfo.perform(
        { carrier: 'shippo', trackingNumber: 'SHIPPO_TRANSIT' },
        { provider: shippo }
      );
      shipment = result.unwrap()[0];
    });

    it('should return valid status', () => {
      expect(shipment.status.statusCode).toBe('transit');
      expect(shipment.status.statusText).toBe(
        'Your shipment has departed from the origin.'
      );
    });

    it('should return events', () => {
      expect(shipment.events.length).toBe(2);
    });

    it('should return estimated delivery date', () => {
      expect(shipment.estimatedDeliveryDate).toBeDefined();
    });
  });
});
