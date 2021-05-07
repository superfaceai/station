import { CLIError } from '@oclif/errors';
import {
  isMapDefinitionNode,
  isMapDocumentNode,
  isProfileDocumentNode,
  isUseCaseDefinitionNode,
  isValidDocumentName,
  MapDocumentNode,
  ProfileASTNode,
  ProfileDocumentNode,
} from '@superfaceai/ast';
import { isValidProviderName, parseProviderJson } from '@superfaceai/one-sdk';

import {
  exists,
  EXTENSIONS,
  extractVersion,
  getDirectories,
  getFiles,
  LogCallback,
  PROFILE_BUILD_PATH,
  PROVIDERS_DIR,
  readFile,
  versionDiffers,
} from '../common';

async function loadProfileAst(path: string): Promise<ProfileDocumentNode> {
  if (!(await exists(path))) {
    throw new CLIError(`File: "${path}" not found - forgot to compile?`, {});
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

/**
 * Checks differences between map and profile
 */
function checkMapAndProfile(
  profile: ProfileDocumentNode,
  map: MapDocumentNode,
  folderVersionStr: string,
  options?: {
    logCb?: LogCallback;
  }
): void {
  options?.logCb?.(`Checking if version in header and in folder name matches`);
  const folderVersion = extractVersion(folderVersionStr);

  //Version in header and in folder name should match
  const profileVersionDiff = versionDiffers(
    folderVersion,
    profile.header.version
  );
  if (profileVersionDiff) {
    throw new CLIError(
      `Profile in version "${folderVersionStr}" has different version in header than in file name. Differs in ${profileVersionDiff}`,
      { exit: 1 }
    );
  }

  const mapVersionDiff = versionDiffers(
    folderVersion,
    map.header.profile.version
  );
  if (mapVersionDiff) {
    throw new CLIError(
      `Map "${folderVersionStr}/${map.header.provider}" has different version in header than in file name. Differs in ${mapVersionDiff}`,
      { exit: 1 }
    );
  }

  options?.logCb?.(
    `Checking versions of profile: "${profile.header.name}" and map for provider: ""${map.header.provider}`
  );

  //Map ast version & profile ast version
  const astVersionDiff = versionDiffers(
    profile.header.version,
    map.header.profile.version
  );
  if (astVersionDiff) {
    throw new CLIError(
      `Map "${folderVersionStr}/${map.header.provider}" has different version in header than coresponfing profile "${folderVersionStr}/${profile.header.name}". Differs in ${astVersionDiff}`,
      { exit: 1 }
    );
  }
  options?.logCb?.(`Checking scope`);

  //Header
  //acopes should match
  if (profile.header.scope !== map.header.profile.scope) {
    throw new CLIError(
      `Profile "${profile.header.name}" has map for provider "${map.header.provider}" with different scope`,
      { exit: 1 }
    );
  }
  //check if scope is valid document name
  if (profile.header.scope && map.header.profile.scope) {
    if (!isValidDocumentName(profile.header.scope)) {
      throw new CLIError(
        `Profile "${folderVersionStr}/${profile.header.name}" has invalid scope "${profile.header.scope}"`,
        { exit: 1 }
      );
    }

    if (!isValidDocumentName(map.header.profile.scope)) {
      throw new CLIError(
        `Map for provider "${folderVersionStr}/${map.header.provider}" has invalid profile scope "${map.header.profile.scope}"`,
        { exit: 1 }
      );
    }
  }
  //check if names are valid document name
  if (!isValidDocumentName(profile.header.name)) {
    throw new CLIError(
      `Profile "${folderVersionStr}/${profile.header.name}" has invalid name "${profile.header.name}"`,
      { exit: 1 }
    );
  }

  if (!isValidDocumentName(map.header.profile.name)) {
    throw new CLIError(
      `Map for provider "${folderVersionStr}/${map.header.provider}" has invalid profile name "${map.header.profile.name}"`,
      { exit: 1 }
    );
  }
  //Names should match
  if (profile.header.name !== map.header.profile.name) {
    throw new CLIError(
      `Profile "${profile.header.name}" has map for provider "${map.header.provider}" with different name`,
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

/**
 * Checks basic logical consistency in compiled files
 */
export async function check(options?: { logCb?: LogCallback }): Promise<void> {
  const scopes = await getDirectories(`./${PROFILE_BUILD_PATH}`);
  let profileAst: ProfileDocumentNode;
  let mapAst: MapDocumentNode;
  let useCases: string[];
  let versions: string[];
  let maps: string[];

  for (const scope of scopes) {
    useCases = await getDirectories(`./${PROFILE_BUILD_PATH}/${scope}`);
    for (const useCase of useCases) {
      versions = await getDirectories(
        `./${PROFILE_BUILD_PATH}/${scope}/${useCase}`
      );

      //Check duplicite versions
      versions.forEach(version => {
        //There is more folders with same version
        if (versions.filter(v => v === version).length > 1) {
          throw new CLIError(
            `There is more than one folder with version "${version}" at path ./${PROFILE_BUILD_PATH}/${scope}/${useCase}`
          );
        }
      });
      for (const version of versions) {
        //Load profile
        options?.logCb?.(
          `Checking profile: "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${version}/profile${EXTENSIONS.profile.source}"`
        );
        profileAst = await loadProfileAst(
          `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${version}/profile${EXTENSIONS.profile.build}`
        );

        if (
          !(await exists(
            `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${version}/maps`
          ))
        ) {
          throw new CLIError(
            `Folder: "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/maps" not found - forgot to compile?`,
            { exit: 1 }
          );
        }

        //Load maps
        maps = (
          await getFiles(
            `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${version}/maps`
          )
        ).filter(map => map.endsWith(EXTENSIONS.map.build));
        if (maps.length === 0) {
          throw new CLIError(
            `Folder "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${version}/maps" does not contain any built maps - forgot to compile?`,
            { exit: 1 }
          );
        }

        for (const file of maps) {
          options?.logCb?.(
            `Checking map: "./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${version}/maps/${file}"`
          );

          mapAst = await loadMapAst(
            `./${PROFILE_BUILD_PATH}/${scope}/${useCase}/${version}/maps/${file}`
          );

          //Check map and profile
          checkMapAndProfile(profileAst, mapAst, version, options);

          //Check provider
          if (!isValidProviderName(mapAst.header.provider)) {
            throw new CLIError(
              `Provider "${mapAst.header.provider}" not found`,
              {
                exit: 1,
              }
            );
          }
          if (
            !(await exists(
              `./${PROVIDERS_DIR}/${mapAst.header.provider}${EXTENSIONS.provider}`
            ))
          ) {
            throw new CLIError(
              `Provider "${mapAst.header.provider}" not found`,
              {
                exit: 1,
              }
            );
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
}
