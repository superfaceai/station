const { SuperfaceClient } = require('@superfaceai/one-sdk');

async function main() {

  const sdk = new SuperfaceClient();

  // Load the installed profile
  const profile = await sdk.getProfile('vcs/user-repos');

  // Use the profile
  const result = await profile
    .getUseCase('UserRepos')
    .perform({
      user: 'superfaceai',
      // user: 'd9mi',
      // user: 'Jakub-Vacek',
      // user: 'redhat',
      // user: 'pawelbanasik',
      // user: 'jakuvacek',
      perPage: 1,
    }, { provider: 'github' });

  try {
    const data = result.unwrap();
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

main();
