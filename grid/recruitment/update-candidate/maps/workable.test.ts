import {
  updateCandidateTest,
  updateCandidateWorkableSpecificTest,
} from './update-candidate';
import { updateCandidateFeaturesTest } from './update-candidate-features';

updateCandidateTest('workable', {
  validCandidateId: 'd686952',
  invalidCandidateId: 'INVALID_CANDIDATE_ID',
});

updateCandidateFeaturesTest('workable');

updateCandidateWorkableSpecificTest();
