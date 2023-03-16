import { multipartFormDataBoundaryMatcherHook } from '../../../../test/helpers/multipart_form_data_boundary_matcher_hook';
import { createLeadBreezyHRSpecificTest, createLeadTest } from './create-lead';
import { createLeadFeaturesTest } from './create-lead-features';

const breezyHRProviderName = 'breezy-hr';

createLeadTest(
  breezyHRProviderName,
  {
    valid: '3a32a88d8c1601',
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

createLeadBreezyHRSpecificTest();

createLeadFeaturesTest(breezyHRProviderName);
