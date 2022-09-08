import { publishVideoTest } from './upload-from-url';

publishVideoTest('instagram', 'single video', {
  caption: 'Single video from Superface Station.',
  url: 'https://download.samplelib.com/mp4/sample-5s.mp4',
  type: 'video',
});

publishVideoTest('instagram', 'single reel', {
  caption: 'Single reel from Superface Station.',
  url:
    'https://assets.mixkit.co/videos/download/mixkit-waves-in-the-water-1164.mp4',
  type: 'reel',
});
