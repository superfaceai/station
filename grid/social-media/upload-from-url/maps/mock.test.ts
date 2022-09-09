import { publishVideoTest } from './upload-from-url';

publishVideoTest('mock', 'single video', {
  caption: 'Single video from Superface Station.',
  url: 'https://download.samplelib.com/mp4/sample-5s.mp4',
  uploadType: 'video',
});
