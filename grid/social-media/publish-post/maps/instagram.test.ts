import { publishInputCasesTest, publishPostErrorTest } from './publish-post';

// publishMediaPostTest('instagram');
publishInputCasesTest('instagram', [
  {
    name: 'single picture',
    input: {
      text: 'Single post from Superface Station.',
      media: [
        {
          url:
            'https://upload.wikimedia.org/wikipedia/commons/0/09/Sitta-carolinensis-001.jpg',
        },
      ],
    },
  },
  {
    name: 'carousel',
    input: {
      text: 'Carousel post from Superface Station.',
      media: [
        {
          url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bloem_van_een_Astrantia_major_%27Roma%27._24-06-2021_%28actm.%29_01.jpg/960px-Bloem_van_een_Astrantia_major_%27Roma%27._24-06-2021_%28actm.%29_01.jpg',
        },
        {
          url:
            'https://upload.wikimedia.org/wikipedia/commons/0/09/Sitta-carolinensis-001.jpg',
        },
      ],
    },
  },
]);
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
