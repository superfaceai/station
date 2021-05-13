import { SuperfaceClient } from '../../../../superface/sdk';

describe('delivery-tracking/shipment-info/mock-typed', () => {
  it('should define use-case and provider', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('delivery-tracking/shipment-info');
    const provider = await client.getProvider('mock');
    const usecase = profile.useCases.ShipmentInfo;

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();
  });

  it('should return shipment info', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('delivery-tracking/shipment-info');
    const provider = await client.getProvider('mock');

    const result = await profile.useCases.ShipmentInfo.perform(
      {
        trackingNumber: 'TESTING-TRACKING-NUMBER',
      },
      {
        provider: provider,
      }
    );

    expect(result.isOk()).toBeTruthy();

    const shipmentInfo = result.unwrap()[0];
    expect(shipmentInfo.trackingNumber).toBe('TESTING-TRACKING-NUMBER');
    expect(shipmentInfo.carrier).toBe('Mocked carrier');
    expect(shipmentInfo.origin).toBeDefined();
    expect(shipmentInfo.destination).toBeDefined();
    expect(shipmentInfo.status).toBeDefined();
    expect(shipmentInfo.events.length).toBe(2);
  });
});
