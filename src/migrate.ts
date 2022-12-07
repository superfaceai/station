import { assertMapDocumentNode, EXTENSIONS } from '@superfaceai/ast';
import { parseMap, Source } from '@superfaceai/parser';
import * as fs from 'fs';
import { join as joinPath, resolve } from 'path';
import { promisify } from 'util';

import { localMaps, readFile } from './util';

const readDir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkDir = promisify(fs.mkdir);

export async function run(): Promise<void> {
  const maps = await localMaps()

  for (const map of maps) {
    // we need parts after the "grid/""
    const parts = map.split('/grid/')[1].split('/');

    // it should look like "scope/profileName/maps/provider.suma"
    if (parts.length !== 4) {
      throw Error(map);
    }

    const [scope, profileName, , provider] = parts;

    const ast = assertMapDocumentNode(
      parseMap(new Source(await readFile(map)))
    );

    const structure = {
      useCaseNames: ast.definitions
        .filter(d => d.kind === 'MapDefinition')
        .map(d => d.name),
      scope,
      profileName,
      provider: provider.slice(0, provider.lastIndexOf(EXTENSIONS.map.source)),
    };

    const newRecoring: Record<string, Record<string, unknown>> = {};

    if (structure.provider !== 'mock') {
      for (const usecase of structure.useCaseNames) {
        const newRecoringKey = `${structure.scope}/${structure.profileName}/${structure.provider}/${usecase}`;

        newRecoring[newRecoringKey] = {};

        const recordingsDir = joinPath(
          process.cwd(),
          'nock',
          structure.scope,
          structure.profileName,
          structure.provider,
          usecase
        );

        const files = await readDir(recordingsDir);

        for (const file of files) {
          const content: unknown = JSON.parse(
            await readFile(resolve(joinPath(recordingsDir, file)))
          );
          const hash = file.split('-')[1].split('.json')[0];
          newRecoring[newRecoringKey][hash] = content;
        }
      }

      const newRecordingDir = joinPath(
        process.cwd(),
        'grid',
        structure.scope,
        structure.profileName,
        'maps',
        'recordings'
      );

      await mkDir(newRecordingDir, { recursive: true });

      const newRecordingPath = joinPath(
        newRecordingDir,
        `${structure.provider}.recording.json`
      );

      await writeFile(
        newRecordingPath,
        JSON.stringify(newRecoring, undefined, 2)
      );
    }
  }
}

if (require.main === module) {
  void run();
}
