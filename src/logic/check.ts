import { CLIError } from '@oclif/errors';
import {
  isMapDefinitionNode,
  isMapDocumentNode,
  isProfileDocumentNode,
  isUseCaseDefinitionNode,
  MapDocumentNode,
  ProfileASTNode,
  ProfileDocumentNode,
} from '@superfaceai/ast';
import { parseProviderJson } from '@superfaceai/one-sdk';

import {
  exists,
  EXTENSIONS,
  getDirectories,
  getFiles,
  LogCallback,
  PROFILE_BUILD_PATH,
  PROVIDERS_DIR,
  readFile,
} from '../common';

async function loadProfileAst(path: string): Promise<ProfileDocumentNode> {
  if (!(await exists(path))) {
    throw new CLIError(`File: "${path}" not found - forgot to compile?`, {
      exit: 1,
    });
  }
  const astFile = await readFile(path);
  let astJson: ProfileASTNode;
  try {
    astJson = JSON.parse(astFile) as ProfileDocumentNode;
  } catch (error) {
    throw new CLIError(error, { exit: 1 });
  }
  if (!isProfileDocumentNode(astJson)) {
    throw new CLIError(`File "${path}" has unknown structure`, { exit: 1 });
  }

  return astJson;
}

async function loadMapAst(path: string): Promise<MapDocumentNode> {
  if (!(await exists(path))) {
    throw new CLIError(`File: "${path}" not found - forgot to compile?`, {
      exit: 1,
    });
  }
  const astFile = await readFile(path);
  let astJson: MapDocumentNode;
  try {
    astJson = JSON.parse(astFile) as MapDocumentNode;
  } catch (error) {
    throw new CLIError(error, { exit: 1 });
  }
  if (!isMapDocumentNode(astJson)) {
    throw new CLIError(`File "${path}" has unknown structure`, { exit: 1 });
  }

  return astJson;
}

function checkMapAndProfile(
  profile: ProfileDocumentNode,
  map: MapDocumentNode,
  options?: {
    logCb?: LogCallback;
  }
): void {
  options?.logCb?.(
    `Checking versions of profile: "${profile.header.name}" and map for provider: ""${map.header.provider}`
  );
  //Header
  if (profile.header.scope !== map.header.profile.scope) {
    throw new CLIError(
      `Profile "${profile.header.name}" has map for provider "${map.header.provider}" with different scope`,
      { exit: 1 }
    );
  }
  if (profile.header.name !== map.header.profile.name) {
    throw new CLIError(
      `Profile "${profile.header.name}" has map for provider "${map.header.provider}" with different name`,
      { exit: 1 }
    );
  }
  if (profile.header.version.major !== map.header.profile.version.major) {
    throw new CLIError(
      `Profile "${profile.header.name}" has map for provider "${map.header.provider}" with different MAJOR version`,
      { exit: 1 }
    );
  }
  if (profile.header.version.minor !== map.header.profile.version.minor) {
    throw new CLIError(
      `Profile "${profile.header.name}" has map for provider "${map.header.provider}" with different MINOR version`,
      { exit: 1 }
    );
  }
  //Map and profile can differ in patch.

  if (profile.header.version.label !== map.header.profile.version.label) {
    throw new CLIError(
      `Profile "${profile.header.name}" has map for provider "${map.header.provider}" with different LABEL version`,
      { exit: 1 }
    );
  }
  options?.logCb?.(
    `Checking usecase definitions in profile: "${profile.header.name}" and map for provider: "${map.header.provider}"`
  );

  //Definitions
  const mapUsecases: string[] = [];
  const profileUsecases: string[] = [];
  map.definitions.forEach(definition => {
    if (isMapDefinitionNode(definition))
      mapUsecases.push(definition.usecaseName);
  });
  profile.definitions.forEach(definition => {
    if (isUseCaseDefinitionNode(definition))
      profileUsecases.push(definition.useCaseName);
  });

  if (mapUsecases.length !== profileUsecases.length) {
    throw new CLIError(
      `Profile "${profile.header.name}" defines ${profileUsecases.length} use cases but map for provider "${map.header.provider}" has ${mapUsecases.length}`,
      { exit: 1 }
    );
  }

  for (const usecase of profileUsecases) {
    if (!mapUsecases.includes(usecase)) {
      throw new CLIError(
        `Profile "${profile.header.name}" defines usecase ${usecase} but map for provider "${map.header.provider}" does not`,
        { exit: 1 }
      );
    }
  }
}

export async function check(options?: { logCb?: LogCallback }): Promise<void> {
  const scopes = await getDirectories(`./${PROFILE_BUILD_PATH}`);
  let profileAst: ProfileDocumentNode;
  let mapAst: MapDocumentNode;
  let useCases: string[];
  let maps: string[];

  for (const scope of scopes) {
    useCases = await getDirectories(`./${PROFILE_BUILD_PATH}/${scope}`);
    for (const useCase of useCases) {
      //Load profile
      options?.logCb?.(
        `Checking profile: "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/profile${EXTENSIONS.profile.build}"`
      );
      profileAst = await loadProfileAst(
        `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/profile${EXTENSIONS.profile.build}`
      );

      if (!(await exists(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps`))) {
        throw new CLIError(
          `Folder: "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps" not found - forgot to compile?`,
          { exit: 1 }
        );
      }
      maps = (
        await getFiles(`./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps`)
      ).filter(map => map.endsWith(EXTENSIONS.map.build));
      if (maps.length === 0) {
        throw new CLIError(
          `Folder "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps" does not contain any built maps - forgot to compile?`,
          { exit: 1 }
        );
      }

      for (const file of maps) {
        options?.logCb?.(
          `Checking map: "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}"`
        );

        mapAst = await loadMapAst(
          `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps/${file}`
        );
        //Check map and profile
        checkMapAndProfile(profileAst, mapAst);

        //Check provider
        if (
          !(await exists(
            `./${PROVIDERS_DIR}/${mapAst.header.provider}${EXTENSIONS.provider}`
          ))
        ) {
          throw new CLIError(`Provider "${mapAst.header.provider}" not found`, {
            exit: 1,
          });
        }
        const providerFile = await readFile(
          `./${PROVIDERS_DIR}/${mapAst.header.provider}${EXTENSIONS.provider}`
        );
        options?.logCb?.(
          `Checking provider: "./${PROVIDERS_DIR}/${mapAst.header.provider}${EXTENSIONS.provider}"`
        );
        try {
          parseProviderJson(JSON.parse(providerFile));
        } catch (error) {
          throw new CLIError(error, { exit: 1 });
        }
      }
    }
  }
}
