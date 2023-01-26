import { createCandidateTest } from './create-candidate';
import { createCandidateFeaturesTest } from './create-candidate-features';

const GREENHOUSE_PROVIDER_NAME = 'greenhouse';

createCandidateTest(GREENHOUSE_PROVIDER_NAME, {
  valid: '4031896006',
  invalid: '-1',
});

createCandidateFeaturesTest(GREENHOUSE_PROVIDER_NAME);
