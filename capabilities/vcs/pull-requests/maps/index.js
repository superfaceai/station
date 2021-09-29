const { SuperfaceClient } = require('@superfaceai/one-sdk');

async function main() {
  const sdk = new SuperfaceClient();

  // Load the installed profile
  const profile = await sdk.getProfile('vcs/pull-requests');

  // Use the profile
  const result = await profile.getUseCase('PullRequests').perform(
    {
      // user: 'superfaceai',
      // user: 'd9mi',
      // user: 'Jakub-Vacek',
      // user: 'redhat',
      // user: 'pawelbanasik',
      owner: 'JakubVacek',
      repo: 'test',
      perPage: 10,
    },
    { provider: 'bitbucket' }
  );

  try {
    const data = result.unwrap();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

main();
