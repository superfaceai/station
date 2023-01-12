import { getCVTest, getCVWorkableSpecificTest } from './get-cv';

getCVTest('workable', {
  validCandidateId: 'd686952',
  invalidCandidateIds: ['INVALID_CANDIDATE_ID'],
});

getCVWorkableSpecificTest();
