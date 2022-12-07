
import { assertMapDocumentNode, EXTENSIONS } from '@superfaceai/ast';
import { parseMap, Source } from '@superfaceai/parser';
import { localMaps, readFile } from './util';
import { join as joinPath, resolve } from 'path';


import * as fs from 'fs';
import { promisify } from 'util';


const readDir = promisify(fs.readdir);

// const writeFile = promisify(fs.writeFile);


export async function run(): Promise<void> {

  const maps = await localMaps()

  for (const map of maps) {

    // we need part after the "grid/""
    const parts = map.split('/grid/')[1].split('/')

    // it should look like "scope/profileName/maps/provider.suma"
    if (parts.length !== 4) {
      throw Error(map)
    }

    const ast = assertMapDocumentNode(parseMap(new Source(await readFile(map))))



    const structure = {
      useCaseNames: ast.definitions.filter(d => d.kind === 'MapDefinition').map(d => d.name),
      scope: parts[0],
      profileName: parts[1],
      provider: parts[3].slice(0, parts[3].lastIndexOf(EXTENSIONS.map.source))
    }

    console.log('structire', structure)

    const newRecoring: Record<string, Record<string, unknown>> = {}

    if (structure.provider !== 'mock') {
      for (const usecase of structure.useCaseNames) {

        const newRecoringKey = `${structure.scope}/${structure.profileName}/${structure.provider}/${usecase}`

        newRecoring[newRecoringKey] = {}

        const recordingsDir = joinPath(process.cwd(), 'nock', structure.scope, structure.profileName, structure.provider, usecase)
        console.log('rec', recordingsDir)

        const files = await readDir(recordingsDir)

        console.log('dir', files)

        for (const file of files) {
          const content = await readFile(resolve(joinPath(recordingsDir, file)))
          const hash = file.split('-')[1].split('.json')[0]
          newRecoring[newRecoringKey][hash] = content
        }


      }
      const newRecordingPath = joinPath(process.cwd(), 'grid', structure.scope, structure.profileName, 'maps', 'recordings', `${structure.provider}.recording.json`)

      console.log(newRecordingPath, ' = > ', newRecoring)





    }

  }



}



if (require.main === module) {
  void run();
}
