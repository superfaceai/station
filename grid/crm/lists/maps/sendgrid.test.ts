import { addContactsToListTest, getListsTest } from './lists';

getListsTest('sendgrid');
addContactsToListTest(
  'sendgrid',
  ['demo+added_one@superface.ai', 'demo+added_two@superface.ai'],
  '17a9df8c-9003-4c60-8e27-8492aebdacce',
);
