import { SuperJson } from '@superfaceai/one-sdk';
import { parseDocumentId } from '@superfaceai/parser';

export type CheckCombination = {
  profile: { scope?: string; name: string };
  provider: string;
};

let superJson: SuperJson;

export function loadSuperJson(): SuperJson {
  if (!superJson) {
    superJson = SuperJson.loadSync().unwrap();
  }

  return superJson;
}

export function allProfileProviderCombinations(
  superJson: SuperJson = loadSuperJson()
): CheckCombination[] {
  const profiles = superJson.normalized.profiles;
  const checkCombinations: CheckCombination[] = [];

  for (const profileId in profiles) {
    const parseResult = parseDocumentId(profileId);

    if (parseResult.kind === 'error') {
      throw new Error(`Invalid profile id: ${parseResult.message}`);
    }

    const profile = {
      name: parseResult.value.middle[0],
      scope: parseResult.value.scope,
    };

    const profileSettings = profiles[profileId];
    for (const provider in profileSettings.providers) {
      checkCombinations.push({ profile, provider });
    }
  }

  return checkCombinations;
}
