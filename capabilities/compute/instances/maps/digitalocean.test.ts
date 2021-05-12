import { Provider } from '@superfaceai/one-sdk';
import { TypedUseCase } from '@superfaceai/one-sdk/dist/client/public/usecase';

import {
  ComputeInstancesProfile,
  SuperfaceClient,
} from '../../../../superface/sdk';
import {
  CreateInstanceInput,
  CreateInstanceResult,
  InstanceInfoInput,
  InstanceInfoResult,
} from '../../../../superface/types/compute';

describe('compute/instances/digitalocean-typed', () => {
  let client: SuperfaceClient;
  let profile: ComputeInstancesProfile;
  let provider: Provider;

  beforeEach(async () => {
    client = new SuperfaceClient();
    profile = await client.getProfile('compute/instances');
    provider = await client.getProvider('digitalocean');
  });

  it('should have provider defined', () => {
    expect(provider).toBeDefined();
  });

  describe('CreateInstance', () => {
    let usecase: TypedUseCase<CreateInstanceInput, CreateInstanceResult>;

    beforeEach(() => {
      usecase = profile.useCases.CreateInstance;
    });

    it('should be defined usecase', () => {
      expect(usecase).toBeDefined();
    });
  });

  describe('InstanceInfo', () => {
    let usecase: TypedUseCase<InstanceInfoInput, InstanceInfoResult>;

    beforeEach(() => {
      usecase = profile.useCases.InstanceInfo;
    });

    it('should be defined usecase', () => {
      expect(usecase).toBeDefined();
    });
  });
});
