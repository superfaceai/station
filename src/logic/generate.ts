import { CLIError } from '@oclif/errors';
import {
  isProfileDocumentNode,
  ProfileASTNode,
  ProfileDocumentNode,
} from '@superfaceai/ast';
import {
  generateTypesFile,
  generateTypingsForProfile,
} from '@superfaceai/cli/dist/logic/generate';

import { LogCallback } from '../common';
import {
  EXTENSIONS,
  PROFILE_BUILD_PATH,
  TYPE_DEFINITIONS_FILE,
  TYPES_FILE_PATH,
  TYPES_PATH,
} from '../common/constants';
import { exists, mkdir, readFile, writeFile } from '../common/io';
import { exportTypeTemplate } from '../common/templates';

export async function generate(
  scope: string,
  profile: string,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Get ATS
  const astPath = `./${PROFILE_BUILD_PATH}/${scope}/${profile}/profile${EXTENSIONS.profile.build}`;
  if (!(await exists(astPath))) {
    throw new CLIError(
      `AST file not found at "${astPath}". You need to run compile command first`,
      { exit: 1 }
    );
  }
  options?.logCb?.(`Looking for AST file at: "${astPath}"`);
  const astFile = await readFile(astPath);
  let astJson: ProfileASTNode;
  try {
    astJson = JSON.parse(astFile) as ProfileASTNode;
  } catch (error) {
    throw new CLIError(error, { exit: 1 });
  }
  if (!isProfileDocumentNode(astJson)) {
    throw new CLIError(`File "${astPath}" has unknown structure`, { exit: 1 });
  }
  options?.logCb?.(
    `AST file found. Generating types for: "${scope}/${profile}"`
  );
  await generateProfileTypes(scope, profile, astJson);

  //Generate types file
  const sdkPath = `./${TYPES_FILE_PATH}`;
  if (!(await exists(sdkPath))) {
    await writeFile(sdkPath, '');
  }
  const typesFile = generateTypesFile(
    [`${scope}/${profile}`],
    await readFile(sdkPath)
  );
  await writeFile(sdkPath, typesFile);

  options?.logCb?.(
    `Updating "sdk.ts" file with types for: "${scope}/${profile}"`
  );
}

export async function generateProfileTypes(
  scope: string,
  profile: string,
  ast: ProfileDocumentNode,
  options?: {
    logCb?: LogCallback;
  }
): Promise<void> {
  //Generate profile types
  const typing = generateTypingsForProfile(`${scope}/${profile}`, ast);
  //Create folder structure if it doesn't exist
  if (!(await exists(`./${TYPES_PATH}`))) {
    await mkdir(`./${TYPES_PATH}`);
  }
  if (!(await exists(`./${TYPES_PATH}/${scope}`))) {
    await mkdir(`./${TYPES_PATH}/${scope}`);
  }
  options?.logCb?.(
    `Writing generated types to "./${TYPES_PATH}/${scope}/${profile}${EXTENSIONS.typescript}"`
  );
  await writeFile(
    `./${TYPES_PATH}/${scope}/${profile}${EXTENSIONS.typescript}`,
    typing
  );

  //Create/update.d.ts index
  let typeDefinitions = '';
  if (await exists(`./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`)) {
    typeDefinitions = await readFile(
      `./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`
    );
  }
  const addition = exportTypeTemplate(profile);
  if (!typeDefinitions.includes(addition)) {
    typeDefinitions = typeDefinitions + addition;

    options?.logCb?.(`Updating index.d.ts with "${addition}"`);
    await writeFile(
      `./${TYPES_PATH}/${scope}/${TYPE_DEFINITIONS_FILE}`,
      typeDefinitions
    );
  }
}
