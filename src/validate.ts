import { check, CheckResult } from '@superfaceai/cli/dist/logic/check';

import { allProfileProviderCombinations, loadSuperJson } from './util';

export async function checkCapabilities(): Promise<CheckResult[]> {
  const checkCombinations = allProfileProviderCombinations();
  const superJson = loadSuperJson();

  const results: CheckResult[] = [];

  const map: {
    variant?: string; // no reason for variants in Station
  } = {};

  for (const checkCombination of checkCombinations) {
    try {
      const checkResults = await check(
        superJson,
        checkCombination.profile,
        checkCombination.provider,
        map
      );

      results.push(...checkResults);
    } catch (err) {
      if (err instanceof Error) {
        results.push({ kind: 'error', message: err.message });
      } else {
        results.push({ kind: 'error', message: 'Unknown error' });
      }
    }
  }

  return results;
}

export async function run(print = console.log): Promise<void> {
  let results: CheckResult[] = [];

  results = results.concat(await checkCapabilities());
  // TODO: check files and structure
  // TODO: check test is present

  if (results.length === 0) {
    print('No issues');
    process.exitCode = 0;
  }

  let hasError = false;

  results.forEach(result => {
    if (result.kind === 'error') {
      hasError = true;
    }
    print(`${result.kind}: ${result.message}`);
  });

  process.exitCode = hasError ? 1 : 0;
}

if (require.main === module) {
  void run();
}
