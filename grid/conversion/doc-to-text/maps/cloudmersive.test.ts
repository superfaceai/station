import { multipartFormDataBoundaryMatcherHook } from '../../../../test/helpers/multipart_form_data_boundary_matcher_hook';
import { docToTextTest } from './doc-to-text';

docToTextTest('cloudmersive', {
  beforeRecordingLoad: multipartFormDataBoundaryMatcherHook(recording => {
    return (
      recording.method === 'POST' &&
      recording.path === '/convert/autodetect/to/txt'
    );
  }),
});
