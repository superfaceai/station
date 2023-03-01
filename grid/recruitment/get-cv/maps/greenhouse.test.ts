/* eslint-disable jest/no-export */

import { getCVTest } from "./get-cv";

const testCandidates = {
  notFound: {
    candidateId: '-1',
  },
  withCV: {
    name: 'Sophia Kessler',
    candidateId: '7413527006',
  },
  withoutCV: {
    name: 'John NoCV',
    candidateId: '7413692006'
  }
}

getCVTest('greenhouse', {
  validCandidateId: testCandidates.withCV.candidateId,
  invalidCandidateIds: [
    testCandidates.withoutCV.candidateId,
    testCandidates.notFound.candidateId
  ]
})
