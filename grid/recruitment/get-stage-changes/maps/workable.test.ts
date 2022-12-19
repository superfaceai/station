import { getStageChangesTest } from './get-stage-changes';

getStageChangesTest(
  'workable',
  { valid: '2ba8f2' },
  { valid: 'd270c55', invalid: 'NOT-EXISTING' }
);
