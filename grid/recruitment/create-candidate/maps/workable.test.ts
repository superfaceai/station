import { createCandidateTest } from './create-candidate';
import { createCandidateFeaturesTest } from './create-candidate-features';

const WORKABLE_PROVIDER_NAME = 'workable';

createCandidateTest(WORKABLE_PROVIDER_NAME, {
  valid: '04D2AB5A08',
  invalid: 'NOT-EXISTING',
});

createCandidateFeaturesTest(WORKABLE_PROVIDER_NAME);
