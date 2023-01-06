import {
  getCVTest,
} from './get-cv';

getCVTest('breezy-hr', {
  validCandidateId: '214429f1ca4c01:0bd8a05e457101',
  invalidCandidateIds: ['WRONG_ID_STRUCTURE','WRONG_JOB_ID:WRONG_CANDIDATE_ID','214429f1ca4c01:WRONG_CANDITE_ID','214429f1ca4c01:214429f1ca4c02'],
});

