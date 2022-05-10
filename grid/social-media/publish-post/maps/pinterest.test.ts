import {
  publishMediaPostTest,
  publishMediaUploadTest,
} from './publish-media-post';
import { publishPostErrorTest } from './publish-post';

publishMediaPostTest('pinterest');
publishPostErrorTest('pinterest', [
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
publishMediaUploadTest('pinterest', [
  { name: 'JPG upload passes', media: ['horizontal.jpg'] },
  { name: 'transparent PNG upload passes', media: ['vase.transparent.png'] },
  {
    name: 'transparent WebP upload fails',
    media: ['vase.transparent.webp'],
    success: false,
  },
]);
