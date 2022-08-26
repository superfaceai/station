/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-export */

import { RecordingProcessOptions, SuperfaceTest } from '@superfaceai/testing';
import { nockConfig } from '../../../test-config';

declare type Template = {
  id: string;
  name: string;
};

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

const htmlTemplateUpdated = `
<!doctype html>
<html>

<head>
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Integration Test Email #1</title>
</head>

<body class="">
This template is used by integration tests only 2
</body>

</html>
`;

export const emailTemplatestTest = (
  provider: string,
  params: {
    id: string;
  },
  options?: RecordingProcessOptions
): void => {
  describe(`communication/email-templates/${provider}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = new SuperfaceTest(
        {
          profile: 'communication/email-templates',
          provider,
        },
        nockConfig
      );
    });

    describe('usecase ListTemplates', () => {
      it('should perform correctly', async () => {
        const result = await superface.run(
          {
            useCase: 'ListTemplates',
            input: {},
          },
          options
        );

        // list values can be different every run, so we can't use snapshots
        if ('value' in result) {
          if (Array.isArray(result.value)) {
            expect(result.value[0]).toHaveProperty('id');
            expect(result.value[0]).toHaveProperty('name');
          }
        }
      });
    });

    describe('usecase GetTemplateContent', () => {
      it('should perform correctly', async () => {
        await expect(
          superface.run(
            {
              useCase: 'GetTemplateContent',
              input: {
                id: params.id,
              },
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });

    describe('usecase CreateTemplate', () => {
      it('should perform correctly', async () => {
        await expect(
          superface.run(
            {
              useCase: 'CreateTemplate',
              input: {
                name: 'Station Create template test (DELETE ME)',
                subject: 'Test Email',
                text: 'This template is used by integration tests only',
                html: htmlTemplate,
              },
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });

    describe('usecase UpdateTemplate', () => {
      it('should perform correctly', async () => {
        const result = await superface.run(
          {
            useCase: 'CreateTemplate',
            input: {
              id: params.id,
              name: 'Station Update template test (DELETE ME)',
              subject: 'Test Email',
              text: 'Empty',
              html: htmlTemplate,
            },
          },
          options
        );

        let newTemplateId = '';

        if (
          'value' in result &&
          typeof result.value === 'object' &&
          result.value !== null &&
          'id' in result.value
        ) {
          newTemplateId = (result.value as Template).id;
        }

        await expect(
          superface.run(
            {
              useCase: 'UpdateTemplate',
              input: {
                id: newTemplateId,
                name: 'Station Update template test updated (DELETE ME)',
                subject: 'Test Email',
                text: 'This template is used by integration tests only',
                html: htmlTemplateUpdated,
              },
            },
            options
          )
        ).resolves.toMatchSnapshot();
      });
    });
  });
};
