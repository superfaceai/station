import * as fs from 'fs';
import { SuperfaceClient } from '../../../../superface/sdk';
// import nock from 'nock';
import { back } from 'nock';

back.fixtures = __dirname + '/nockFixtures';
back.setMode('record')

describe('starwars/character-information/swapi', () => {
  it('performs correctly', async () => {
    const client = new SuperfaceClient();
    const profile = await client.getProfile('starwars/character-information');
    const useCase = profile.useCases.RetrieveCharacterInformation;
    const provider = await client.getProvider('swapi');
    const inputs = {
      characterName: 'Luke Skywalker',
    };

    await testUseCase({ useCase, provider, inputs });
  });
});

// We would abstract this away in some function call
async function testUseCase({ useCase, provider, inputs }: any) {
  expect(useCase).not.toBeUndefined();
  expect(provider).not.toBeUndefined();

  let result: any;

  // We delete the existing fitures. There shoudl be a better way to do this.
  if (process.env.TEST === 'integration') {
    fs.unlinkSync(__dirname + '/nockFixtures/swapi-fixture.json')
  }

  // If the file doesn't exist, it creates one. If it does, it uses what exists in the file.
  const { nockDone } = await back('swapi-fixture.json');
  result = await useCase.perform(inputs, { provider });
  nockDone();

  // Instead of checking the output, we take a snapshot
  expect(result.unwrap()).toMatchSnapshot();
}
