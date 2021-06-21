/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-export */

import { Provider } from '@superfaceai/one-sdk';

import {
  CommunicationEmailTemplatesProfile,
  SuperfaceClient,
} from '../../../../superface/sdk';

const htmlTemplate = `
<!doctype html>
<html>

<head>
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Integration Test Email #1</title>
</head>

<body class="">
This template is used by integration tests only
</body>

</html>
`;

export const emailTemplatestTest = (providerName: string): void => {
  describe(`communication/email-templates/${providerName}`, () => {
    let client: SuperfaceClient;
    let profile: CommunicationEmailTemplatesProfile;
    let provider: Provider;

    beforeAll(() => {
      jest.setTimeout(10000);
    });

    beforeEach(async () => {
      client = new SuperfaceClient();
      profile = await client.getProfile('communication/email-templates');
      provider = await client.getProvider(providerName);
    });

    it('should have profile defined', () => {
      expect(profile).not.toBeUndefined();
    });

    it('should have provider defined', () => {
      expect(provider).not.toBeUndefined();
    });

    describe('usecase ListTemplates', () => {
      it('should perform correctly', async () => {
        const usecase = profile.useCases.ListTemplates;
        expect(usecase).not.toBeUndefined();

        const result = await usecase.perform({}, { provider });
        const templates = result.unwrap();
        const randomTemplate =
          templates[Math.floor(Math.random() * templates.length)];

        expect(Array.isArray(templates)).toBeTruthy();
        expect(typeof randomTemplate.id).toBe('string');
        expect(typeof randomTemplate.name).toBe('string');
      });
    });

    describe('usecase GetTemplateContent', () => {
      it('should perform correctly', async () => {
        const usecase = profile.useCases.GetTemplateContent;
        expect(usecase).not.toBeUndefined();

        const templates = (
          await profile.useCases.ListTemplates.perform({}, { provider })
        ).unwrap();
        const randomTemplate =
          templates[Math.floor(Math.random() * templates.length)];

        const result = await usecase.perform(
          { id: randomTemplate.id },
          { provider }
        );

        const templateData = result.unwrap();

        expect(typeof templateData).toBe('object');
        expect(typeof templateData.subject).toBe('string');
        expect(typeof templateData.text).toBe('string');
        expect(typeof templateData.html).toBe('string');
      });
    });

    describe('usecase CreateTemplate', () => {
      it('should perform correctly', async () => {
        const usecase = profile.useCases.CreateTemplate;
        expect(usecase).not.toBeUndefined();

        const result = await usecase.perform(
          {
            name: 'Station test template',
            subject: 'Integration Test Email #1',
            text: 'This template is used by integration tests only',
            html: htmlTemplate,
          },
          { provider }
        );

        const data = result.unwrap();

        expect(typeof data).toBe('object');
        expect(typeof data.id).toBe('string');
        expect(typeof data.name).toBe('string');
        expect(data.name).toBe('Station test template');
      });
    });
  });
};
