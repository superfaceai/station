import { MapDocumentNode, ProfileDocumentNode } from '@superfaceai/ast';
import { parseMap, parseProfile, Source } from '@superfaceai/parser';

import { CAPABILITIES_DIR, EXTENSIONS, PROFILE_BUILD_PATH } from './constants';
import {
  copyFile,
  exists,
  getDirectories,
  getFiles,
  mkdir,
  readFile,
  writeFile,
} from './io';

async function compileFile(path: string) {
  try {
    const body = await readFile(path);
    const source = new Source(body, path);
    let ast: MapDocumentNode | ProfileDocumentNode;
    if (path.endsWith(EXTENSIONS.map.source)) {
      ast = parseMap(source);
    } else if (path.endsWith(EXTENSIONS.profile.source)) {
      ast = parseProfile(source);
    } else {
      throw new Error(`Invalid suffix:${path}`);
    }
    await writeFile(`${path}.ast.json`, JSON.stringify(ast, null, 2));
  } catch (error) {
    console.log(`Error during compilation of file: ${path}`, error);
  }
}

async function compile() {
  //Get capabilities directories
  const scopes = await getDirectories(`./${CAPABILITIES_DIR}`);
  let profiles: string[];
  let useCases: string[];
  let maps: string[];

  for (const scope of scopes) {
    useCases = await getDirectories(`./${CAPABILITIES_DIR}/${scope}`);
    for (const useCase of useCases) {
      console.log(
        `Coping content of ${CAPABILITIES_DIR}/${scope}/${useCase} to ./${PROFILE_BUILD_PATH}/${scope}/${useCase}`
      );

      //Create folder structure if it doesn't exist
      if (!(await exists(`./${PROFILE_BUILD_PATH}`))) {
        await mkdir(`./${PROFILE_BUILD_PATH}`);
      }
      if (!(await exists(`./${PROFILE_BUILD_PATH}/${scope}`))) {
        await mkdir(`./${PROFILE_BUILD_PATH}/${scope}`);
      }
      if (!(await exists(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}`))) {
        await mkdir(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}`);
      }
      if (!(await exists(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps`))) {
        await mkdir(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps`);
      }
      //Compile profiles
      profiles = await getFiles(`./${CAPABILITIES_DIR}/${scope}/${useCase}`);
      for (const file of profiles) {
        if (file.endsWith('js') || file.endsWith('ts')) {
          console.log(`Skipping profile file: ${file}`);
        } else {
          console.log(`${file} --> ${file}${EXTENSIONS.profile.build}`);
          //This file shoud be profile
          await copyFile(
            `./${CAPABILITIES_DIR}/${scope}/${useCase}/${file}`,
            `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${file}`
          );
          await compileFile(
            `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${file}`
          );
        }
      }
      //Compile maps
      if (!(await exists(`./${CAPABILITIES_DIR}/${scope}/${useCase}/maps`))) {
        console.log(
          `Maps folder ./${CAPABILITIES_DIR}/${scope}/${useCase}/maps does not exist`
        );
      } else {
        maps = await getFiles(`./${CAPABILITIES_DIR}/${scope}/${useCase}/maps`);
        for (const file of maps) {
          if (file.endsWith('js') || file.endsWith('ts')) {
            console.log(`Skipping file: ${file}`);
          } else {
            console.log(`${file} --> ${file}${EXTENSIONS.map.build}`);
            //This file shoud be map
            await copyFile(
              `./${CAPABILITIES_DIR}/${scope}/${useCase}/maps/${file}`,
              `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}`
            );
            await compileFile(
              `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}`
            );
          }
        }
      }
    }
  }
}

compile().catch(e => console.log('Error: ', e));
