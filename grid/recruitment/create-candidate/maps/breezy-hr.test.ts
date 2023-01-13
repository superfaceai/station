import { multipartFormDataBoundaryMatcherHook } from '../../../../test/helpers/multipart_form_data_boundary_matcher_hook';
import { createCandidateTest } from './create-candidate';
import { createCandidateFeaturesTest } from './create-candidate-features';

createCandidateTest(
  'breezy-hr',
  {
    valid: '701c3f2fc42a01',
    invalid: '12345ab789d1dd',
  },
  {
    beforeRecordingLoad: multipartFormDataBoundaryMatcherHook(recording => {
      return (
        recording.method === 'POST' &&
        /^\/v3\/company\/.+\/position\/.+\/candidate\/.+\/resume$/m.test(
          recording.path
        )
      );
    }),
  }
);

createCandidateFeaturesTest('breezy-hr');
