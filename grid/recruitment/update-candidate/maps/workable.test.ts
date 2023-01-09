import {
  updateCandidateTest,
  updateCandidateWorkableSpecificTest,
} from './update-candidate';

updateCandidateTest('workable', {
  validCandidateId: 'd686952',
  invalidCandidateId: 'INVALID_CANDIDATE_ID',
});

updateCandidateWorkableSpecificTest();
