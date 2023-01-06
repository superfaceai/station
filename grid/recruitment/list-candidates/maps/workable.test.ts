import {
  listCandidatesTest,
  listCandidatesWorkableSpecificTest,
} from './list-candidates';

listCandidatesTest('workable', {
  validJobId: '04D2AB5A08',
  invalidJobId: 'NOT_EXISTING',
});

listCandidatesWorkableSpecificTest();
