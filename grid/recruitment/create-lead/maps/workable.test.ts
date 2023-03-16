import { createLeadTest, createLeadWorkableSpecificTest } from './create-lead';
import { createLeadFeaturesTest } from './create-lead-features';

const workableProviderName = 'workable';

createLeadTest(workableProviderName, {
  valid: 'EEF7355636',
  invalid: 'NOT-EXISTING',
});

createLeadWorkableSpecificTest();

createLeadFeaturesTest(workableProviderName);
