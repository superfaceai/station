import { publishPostErrorTest, publishPostTest } from './publish-post';

publishPostTest('twitter');
publishPostErrorTest('twitter', [
  {
    name: 'empty text causes error',
    input: { text: '' },
  },
]);
