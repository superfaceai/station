import { SuperfaceClient } from '@superfaceai/one-sdk';
import { TestAnalysis, TestReport } from '@superfaceai/testing';

const parseAnalysis = (analysis: TestAnalysis) => {
  const addedErrors = analysis.errors.added.join('\n');
  const removedErrors = analysis.errors.removed.join('\n');
  const changedErrors = analysis.errors.changed.join('\n');

  const errorsCount =
    analysis.errors.added.length +
    analysis.errors.removed.length +
    analysis.errors.changed.length;

  if (errorsCount === 0) {
    return undefined;
  }

  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `New report - ${analysis.impact} change`,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Profile:*\n${analysis.profileId}`,
        },
        {
          type: 'mrkdwn',
          text: `*Provider:*\n${analysis.providerName}`,
        },
        {
          type: 'mrkdwn',
          text: `*UseCase:*\n${analysis.useCaseName}`,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Errors:*\n*Added:*\n${addedErrors}`,
        },
        {
          type: 'mrkdwn',
          text: `\n*Removed:*\n${removedErrors}`,
        },
        {
          type: 'mrkdwn',
          text: `\n*Changed:*\n${changedErrors}`,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Input:*\n\`\`\`\n${JSON.stringify(
            analysis.input,
            null,
            2
          )}\n\`\`\``,
        },
        {
          type: 'mrkdwn',
          text: `*Result:*\n\`\`\`\n${JSON.stringify(
            analysis.result,
            null,
            2
          )}\n\`\`\``,
        },
      ],
    },
  ];
};

export const alertProd = async (report: TestReport): Promise<void> => {
  const reports = report.map(parseAnalysis);
  const destination = process.env.PROD_REPORTING_DESTINATION;

  if (destination === undefined) {
    throw new Error(
      'Slack destination is not set. Setup environment variable "PROD_REPORTING_DESTINATION".'
    );
  }

  const client = new SuperfaceClient();
  const profile = await client.getProfile('chat/send-message');
  for (const blocks of reports) {
    if (blocks !== undefined) {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      const result = await profile.getUseCase('SendMessage').perform(
        {
          destination,
          text: 'Provider change report',
          blocks,
        },
        { provider: 'slack' }
      );

      if (result.isErr()) {
        console.warn(result);
      } else {
        console.warn(result.value);
      }
    }
  }
};
