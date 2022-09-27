import { TestAnalysis, TestReport } from '@superfaceai/testing';

const parseAnalysis = (analysis: TestAnalysis): string | undefined => {
  const errorsCount =
    analysis.errors.added.length +
    analysis.errors.removed.length +
    analysis.errors.changed.length;

  if (errorsCount === 0) {
    return undefined;
  }

  return `${analysis.impact} change at ${analysis.recordingPath}:
${analysis.profileId}/${analysis.providerName}/${analysis.useCaseName}

ADDED:
${analysis.errors.added.join('\n')}

REMOVED:
${analysis.errors.removed.join('\n')}

CHANGED:
${analysis.errors.changed.join('\n')}

`;
};

export const alertDev = async (report: TestReport): Promise<void> => {
  const reports = report.map(parseAnalysis);

  for (const report of reports) {
    if (report !== undefined) {
      console.warn(report);
    }
  }
};
