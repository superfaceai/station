import {
  updateCandidateTest,
} from './update-candidate';
import { updateCandidateFeaturesTest } from './update-candidate-features';

updateCandidateTest('greenhouse', {
  validCandidateId: '5884696006',
  invalidCandidateId: '-1',
});

updateCandidateFeaturesTest('greenhouse');