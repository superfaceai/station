import { isProfileDocumentNode, ProfileASTNode, ProfileDocumentNode } from '@superfaceai/ast';
import { generateTypesFile, generateTypingsForProfile } from '@superfaceai/cli/dist/logic/generate';

import { EXTENSIONS, PROFILE_BUILD_PATH, TYPE_DEFINITIONS_FILE, TYPES_FILE_PATH, TYPES_PATH } from "./constants";
import { exists, mkdir, readFile, writeFile } from "./io";
import { exportTypeTemplate } from './templates';

export async function generate(): Promise<void> {
  const profileName = process.argv[2];
  const [scope, profile] = profileName.split('/');

  //Get ATS
  const astPath = `./${PROFILE_BUILD_PATH}/${scope}/${profile}/profile${EXTENSIONS.profile.build}`;
  if (!(await exists(astPath))) {
    throw new Error(`AST file not found at "${astPath}". Try to run compile comand`)
  }
  const astFile = await readFile(astPath)
  let astJson: ProfileASTNode
  try {
    astJson = JSON.parse(astFile) as ProfileASTNode;
  } catch (error) {
    throw new Error(error)
  }
  if (!isProfileDocumentNode(astJson)) {
    throw new Error(`File "${astPath}" has unknown structure`)
  }
  await generateProfileTypes(scope, profile, astJson)

  //Generate types file
  const sdkPath = `./${TYPES_FILE_PATH}`
  if (!(await exists(sdkPath))) {
    await writeFile(sdkPath, '');
  }
  const typesFile = generateTypesFile(
    [`${scope}/${profile}`],
    await readFile(sdkPath)
  );
  await writeFile(sdkPath, typesFile);
}

export async function generateProfileTypes(scope: string, profile: string, ast: ProfileDocumentNode): Promise<void> {
  //Generate profile types
  const typing = generateTypingsForProfile(
    `${scope}/${profile}`, ast
  );
  //Create folder structure if it doesn't exist
  if (!(await exists(`./${TYPES_PATH}`))) {
    await mkdir(`./${TYPES_PATH}`);
  }
  if (!(await exists(`./${TYPES_PATH}/${scope}`))) {
    await mkdir(`./${TYPES_PATH}/${scope}`);
  }
  await writeFile(`./${TYPES_PATH}/${scope}/${profile}${EXTENSIONS.typescript}`, typing);

  //Create/update.d.ts index
  let typeDefinitions = ''
  if (await exists(`./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`)) {
    typeDefinitions = await readFile(`./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`)
  }
  const addition = exportTypeTemplate(profile);
  if (!typeDefinitions.includes(addition)) {
    typeDefinitions = typeDefinitions + exportTypeTemplate(profile)
    await writeFile(`./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`, typeDefinitions)
  }
}

generate().catch(e => console.log('Error: ', e));
