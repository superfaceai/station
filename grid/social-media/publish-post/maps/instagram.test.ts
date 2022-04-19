import { publishMediaPostTest } from './publish-media-post';
import { publishPostErrorTest } from './publish-post';

publishMediaPostTest('instagram');
publishPostErrorTest('instagram', [
  {
    name: 'missing media causes immediate failure',
    input: { profileId: '4', text: 'This should fail.' },
  },
  {
    name: 'invalid profileId ends in not found error',
    input: {
      profileId: '4',
      text: `Test media publishing from Superface Station.`,
      media: [
        {
          url:
            'https://upload.wikimedia.org/wikipedia/commons/0/09/Sitta-carolinensis-001.jpg',
        },
      ],
    },
  },
]);
