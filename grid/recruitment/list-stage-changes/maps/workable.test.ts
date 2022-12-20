import { listStageChangesTest } from './list-stage-changes';

listStageChangesTest(
  'workable',
  { valid: '2ba8f2' },
  { valid: 'd270c55', invalid: 'NOT-EXISTING' }
);
