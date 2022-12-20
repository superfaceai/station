import { listStageChangesTest } from './list-stage-changes';

listStageChangesTest(
  'breezy-hr',
  {
    valid: 'f1cfc5572a5701',
  },
  {
    valid: '1e5d0dfd2b6501',
    invalid: '12345ab789d1dd',
  }
);
