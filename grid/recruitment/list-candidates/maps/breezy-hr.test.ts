import { listCandidatesBreezyHRSpecificTest, listCandidatesTest } from './list-candidates';

listCandidatesTest('breezy-hr', {
  validJobId: '214429f1ca4c01',
  invalidJobId: '12345ab789d1dd',
});

listCandidatesBreezyHRSpecificTest();
