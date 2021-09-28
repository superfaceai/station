import { SuperfaceTest } from '@superfaceai/testing-lib';

describe(`scope/name/provider_name}`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('UseCase', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          profile: 'vcs/user-repos',
          provider: 'github',
          useCase: 'UserRepos',
          input: {
            user: 'jakub-vacek',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
