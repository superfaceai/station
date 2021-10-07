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

  describe('Update', () => {
    it('should return error if id is missing', async () => {
      await expect(
        superface.run(
          {
            profile: 'crm/contacts',
            provider: 'hubspot',
            useCase: 'Update',
            input: {
              email: 'test@example.com',
            },
          },
          {
            afterRecordingLoad,
          }
        )
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run(
          {
            profile: 'crm/contacts',
            provider: 'hubspot',
            useCase: 'Update',
            input: {
              id: '401',
              firstName: 'Updated first name',
            },
          },
          {
            afterRecordingLoad,
          }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('Search', () => {
    it('should return error for unknown operator', async () => {
      await expect(
        superface.run(
          {
            profile: 'crm/contacts',
            provider: 'hubspot',
            useCase: 'Search',
            input: {
              property: 'firstname',
              operator: '%',
              value: 'John',
            },
          },
          {
            afterRecordingLoad,
          }
        )
      ).resolves.toMatchSnapshot();
    });

    it('should perform successfully', async () => {
      await expect(
        superface.run(
          {
            profile: 'crm/contacts',
            provider: 'hubspot',
            useCase: 'Search',
            input: {
              property: 'firstname',
              operator: '=',
              value: 'Test',
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
