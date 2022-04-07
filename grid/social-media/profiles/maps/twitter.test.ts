import { profilesTest } from './profiles';

const profileIds = [
  '12', // jack
  '783214', // twitter
  '13334762', // github
  '1196797704015400960', // superfaceai
  '1232783237623119872', // NASAPersevere
  '732521058507620356', // Ukraine
];

const usernames = ['NASAPersevere', 'superfaceai', 'CrowdDevHQ'];

profilesTest('twitter', { profileIds, usernames });
