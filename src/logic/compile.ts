import { CLIError } from '@oclif/errors';
import { MapDocumentNode, ProfileDocumentNode } from '@superfaceai/ast';
import {
  generateTypesFile,
  generateTypingsForProfile,
} from '@superfaceai/cli/dist/logic/generate';
import { parseMap, parseProfile, Source } from '@superfaceai/parser';

import { LogCallback } from '../common';
import {
  CAPABILITIES_DIR,
  EXTENSIONS,
  PROFILE_BUILD_PATH,
  TYPE_DEFINITIONS_FILE,
  TYPES_FILE_PATH,
  TYPES_PATH,
} from '../common/constants';
import {
  copyFile,
  exists,
  getDirectories,
  getFiles,
  mkdir,
  readFile,
  writeFile,
} from '../common/io';
import { exportTypeTemplate } from '../common/templates';
import { cleanBuildFolder } from './clean-build-folder';

export async function compileProfile(
  path: string
): Promise<ProfileDocumentNode> {
  if (!path.endsWith(EXTENSIONS.profile.source)) {
    throw new CLIError(`Invalid profile suffix:${path}`, { exit: 1 });
  } else {
    const body = await readFile(path);
    const source = new Source(body, path);

    return parseProfile(source);
  }
}

export async function compileMap(path: string): Promise<MapDocumentNode> {
  if (!path.endsWith(EXTENSIONS.map.source)) {
    throw new CLIError(`Invalid map suffix:${path}`, { exit: 1 });
  } else {
    const body = await readFile(path);
    const source = new Source(body, path);

    return parseMap(source);
  }
}

export async function compile(
  generateFlag: boolean,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Clean build folder (./superface/grid)
  await cleanBuildFolder(options);

  //Get capabilities directories
  const scopes = await getDirectories(`./${CAPABILITIES_DIR}`);
  let profiles: string[];
  let useCases: string[];
  let maps: string[];
  const profileIds: string[] = [];

  for (const scope of scopes) {
    useCases = await getDirectories(`./${CAPABILITIES_DIR}/${scope}`);
    for (const useCase of useCases) {
      options?.logCb?.(
        `Copying content of ${CAPABILITIES_DIR}/${scope}/${useCase} to ./${PROFILE_BUILD_PATH}/${scope}/${useCase}`
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
          options?.logCb?.(`Skipping file: "${file}"`);
        } else {
          options?.logCb?.(
            `Compiling "${file}" to "${file}${EXTENSIONS.profile.build}"`
          );
          //This file shoud be profile
          await copyFile(
            `./${CAPABILITIES_DIR}/${scope}/${useCase}/${file}`,
            `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${file}`
          );
          //Compile AST
          const path = `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${file}`;
          const ast = await compileProfile(path);
          await writeFile(`${path}.ast.json`, JSON.stringify(ast, null, 2));

          if (generateFlag) {
            //Generate profile types
            const typing = generateTypingsForProfile(ast);
            //Create folder structure if it doesn't exist
            if (!(await exists(`./${TYPES_PATH}`))) {
              await mkdir(`./${TYPES_PATH}`);
            }
            if (!(await exists(`./${TYPES_PATH}/${scope}`))) {
              await mkdir(`./${TYPES_PATH}/${scope}`);
            }
            await writeFile(
              `./${TYPES_PATH}/${scope}/${useCase}${EXTENSIONS.typescript}`,
              typing
            );
            options?.logCb?.(
              `Writing generated types to "./${TYPES_PATH}/${scope}/${useCase}${EXTENSIONS.typescript}"`
            );

            //Create/update.d.ts index
            let typeDefinitions = '';
            if (
              await exists(`./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`)
            ) {
              typeDefinitions = await readFile(
                `./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`
              );
            }
            const addition = exportTypeTemplate(useCase);
            if (!typeDefinitions.includes(addition)) {
              typeDefinitions = typeDefinitions + addition;
              options?.logCb?.(`Updating index.d.ts with "${addition}"`);
              await writeFile(
                `./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`,
                typeDefinitions
              );
            }
          }
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
            options?.logCb?.(`Skipping file: "${file}"`);
          } else {
            options?.logCb?.(
              `Compiling "${file}" to "${file}${EXTENSIONS.map.build}"`
            );
            //This file shoud be map
            await copyFile(
              `./${CAPABILITIES_DIR}/${scope}/${useCase}/maps/${file}`,
              `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}`
            );
            const ast = await compileMap(
              `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}`
            );
            await writeFile(
              `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}.ast.json`,
              JSON.stringify(ast, null, 2)
            );
          }
        }
      }
      profileIds.push(`${scope}/${useCase}`);
    }
  }
  if (generateFlag) {
    //Generate types file
    const sdkPath = `./${TYPES_FILE_PATH}`;
    if (!(await exists(sdkPath))) {
      await writeFile(sdkPath, '');
    }
    const typesFile = generateTypesFile(profileIds);

    await writeFile(sdkPath, typesFile);
  }
}
