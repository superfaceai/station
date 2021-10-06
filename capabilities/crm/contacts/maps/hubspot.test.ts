import { RecordingScopes, SuperfaceTest } from '@superfaceai/testing-lib';

function afterRecordingLoad(scopes: RecordingScopes) {
  scopes.forEach(scope => {
    scope.filteringPath(
      /hapikey=[^&]*/g,
      'hapikey=credentials-removed-to-keep-them-secure'
    );
  });
}

describe(`crm/contacts/hubspot`, () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest();
  });

  describe('Create', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run(
          {
            profile: 'crm/contacts',
            provider: 'hubspot',
            useCase: 'Create',
            input: {
              email: 'test@example.com',
              firstName: 'Test',
              lastName: 'User',
              company: 'Station Test',
              country: 'USA',
              customProperties: {
                myproperty: 'value',
              },
            },
          },
          {
            afterRecordingLoad,
          }
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
