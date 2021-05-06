import { CLIError } from '@oclif/errors';
import { isValidVersionString, VERSION_NUMBER_RE } from '@superfaceai/ast';
import { trimExtension } from '@superfaceai/cli';

//Case utils
export function kebabToCamelCase(input: string): string {
  return input
    .split('-')
    .map((word: string, index: number) => {
      if (index > 0) {
        return word.charAt(0).toUpperCase() + word.substring(1, word.length);
      }

      return word;
    })
    .join('');
}

export function kebabToPascalCase(input: string): string {
  return input
    .split('-')
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.substring(1, word.length);
    })
    .join('');
}
//Version utils
export type Version = {
  major: number;
  minor: number | undefined;
  patch?: number | undefined;
  label?: string | undefined;
};

export function extractVersionString(input: string): string {
  const trimed = trimExtension(input);
  const [, version] = trimed.split('@');
  if (!isValidVersionString(version)) {
    throw new CLIError(`Invalid version string in "${input}"`, { exit: 1 });
  }

  return version;
}

export function parseVersionNumber(str: string): number {
  const value = str.trim();
  if (!VERSION_NUMBER_RE.test(value)) {
    throw new CLIError(`Unalbe to parse version string "${str}"`);
  }

  return parseInt(value, 10);
}

export function extractVersion(versionString: string): Version {
  const [version, label] = versionString.split('-');
  const [majorStr, minorStr, patchStr] = version.split('.');

  const major = parseVersionNumber(majorStr);

  let minor = undefined;
  if (minorStr !== undefined) {
    minor = parseVersionNumber(minorStr);
  }

  let patch = undefined;
  if (patchStr !== undefined) {
    patch = parseVersionNumber(patchStr);
  }

  return { major, minor, patch, label };
}

export function versionDiffers(
  versionA: Version,
  versionB: Version
): 'MAJOR' | 'MINOR' | 'PATCH' | 'LABEL' | undefined {
  if (versionA.major !== versionB.major) {
    return 'MAJOR';
  }
  if (versionA.minor !== versionB.minor) {
    return 'MINOR';
  }
  if (versionA.patch !== versionB.patch) {
    return 'PATCH';
  }
  if (versionA.label !== versionB.label) {
    return 'LABEL';
  }

  return undefined;
}
