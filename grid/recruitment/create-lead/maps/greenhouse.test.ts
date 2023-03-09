import { createLeadTest } from './create-lead';
const GREENHOUSE_PROVIDER_NAME = 'greenhouse';

createLeadTest(GREENHOUSE_PROVIDER_NAME, {
  valid: '4031896006',
  invalid: '-1',
});

