import { SuperfaceClient } from '@superfaceai/one-sdk';

describe('computer-vision/face-detection/mock', () => {
  it('should return mock data', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('computer-vision/face-detection');
    const provider = await client.getProvider('mock');
    const usecase = profile.getUseCase('FaceDetection');

    expect(provider).not.toBeUndefined();
    expect(usecase).not.toBeUndefined();

    const result = await usecase.perform(
      {
        imageUrl: 'mock',
      },
      { provider: 'mock' }
    );

    result.unwrap();
    expect(result.isOk()).toBeTruthy();

    const faceAnnotations = result.unwrap() as any;
    expect(faceAnnotations[0]).toHaveProperty('faces');
    expect(faceAnnotations[0].faces?.[0]).toHaveProperty('emotions');
    expect(faceAnnotations[0].faces?.[0].emotions).toHaveProperty('sadness');
    expect(faceAnnotations[0].faces?.[0].emotions).toHaveProperty('surprise');
    expect(faceAnnotations[0].faces?.[0].emotions).toHaveProperty('happiness');
    expect(faceAnnotations[0].faces?.[0].emotions).toHaveProperty('anger');
    expect(faceAnnotations[0].faces?.[0]).toHaveProperty('landmarks');
    expect(faceAnnotations[0].faces?.[0]).toHaveProperty('faceRectangle');
    expect(faceAnnotations[0].faces?.[0].faceRectangle).toHaveProperty(
      'topLeft'
    );
    expect(faceAnnotations[0].faces?.[0].faceRectangle).toHaveProperty(
      'topRight'
    );
    expect(faceAnnotations[0].faces?.[0].faceRectangle).toHaveProperty(
      'bottomLeft'
    );
    expect(faceAnnotations[0].faces?.[0].faceRectangle).toHaveProperty(
      'bottomRight'
    );
  });
});
