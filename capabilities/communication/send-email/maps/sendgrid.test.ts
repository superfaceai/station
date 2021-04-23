import {
  MappedHTTPError,
  Profile,
  Provider,
  SuperfaceClient,
  UseCase,
} from '@superfaceai/one-sdk';

describe('communication/send-email/sendgrid', () => {
  let client: SuperfaceClient;
  let profile: Profile;
  let useCase: UseCase;
  let provider: Provider;

  beforeEach(async () => {
    client = new SuperfaceClient();
    profile = await client.getProfile('communication/send-email');
    useCase = profile.getUseCase('SendEmail');
    provider = await client.getProvider('sendgrid');
  });

  it('should find useCase', () => {
    expect(useCase).not.toBeUndefined();
  });

  it('should find provider', () => {
    expect(provider).not.toBeUndefined();
  });

  describe('when all inputs are correct', () => {
    it('should return messagaId as result', async () => {
      const result = await useCase.perform(
        {
          subject: 'Station test',
          text: 'Station test',
        },
        { provider }
      );

      expect(typeof (result.unwrap() as any).messageId).toBe('string');

      /*
      TS syntax

      try {
        const result = await useCase.perform({}, { provider });
        expect(typeof result.messageId).toBe('string');
      } catch (err) {
        // handle error
      }

      */
    });
  });

  describe('when inputs are invalid', () => {
    it('should throw error on unwrap', async () => {
      const result = await useCase.perform(
        {
          to: 'invalidemail',
          from: 'invalidemail',
          subject: '',
          text: '',
        },
        { provider }
      );

      try {
        result.unwrap();
      } catch (error) {
        expect(error).toBeInstanceOf(MappedHTTPError);
        expect(error.statusCode).toBe(400);
        expect(error.properties.title).toBe('Invalid inputs');
        expect(error.properties.detail).toContain("Input 'to'");
        expect(error.properties.detail).toContain("Input 'from'");
        expect(error.properties.detail).toContain("Input 'subject'");
        expect(error.properties.detail).toContain("Input 'content'");
      }
    });
  });
});
