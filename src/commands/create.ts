import { CLIError } from '@oclif/errors';
import { isValidDocumentName, isValidVersionString } from '@superfaceai/ast';
import { isValidProviderName } from '@superfaceai/one-sdk';
import { grey } from 'chalk';

import { Command } from '../common';
import { createMap, createProfile, createProvider } from '../logic';

export default class Create extends Command {
  static strict = false;

  static description =
    'Creates map, profile or provider file with basic template on a local filesystem.';

  static args = [
    {
      name: 'documentInfo',
      required: true,
      description:
        'Two arguments containing informations about the document.\n1. Document Type - type of document that will be created (profile or map or provider).\n2. Document Name - name of a file that will be created',
    },
  ];

  static flags = {
    ...Command.flags,
  };

  static examples = [
    '$ station create profile sms/service',
    '$ station create profile sms/service@1.2.3',
    '$ station create map sms/service twilio',
    '$ station create profile sms/service -q',
    '$ station create provider twilio',
  ];

  private logCallback? = (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { argv, flags } = this.parse(Create);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    if (argv.length < 2) {
      throw new CLIError('Invalid number of arguments', { exit: 1 });
    }

    const type = argv[0];
    if (type === 'profile') {
      const documentName = argv[1] ?? argv[0];
      const [scope, usecaseAndVersion] = documentName.split('/');
      const [usecase, version] = usecaseAndVersion.split('@');
      this.checkInput(scope, usecase, version);
      await createProfile(scope, usecase, { logCb: this.logCallback });
    } else if (type === 'map') {
      const mapName = argv[2];
      const documentName = argv[1] ?? argv[0];
      const [scope, usecaseAndVersion] = documentName.split('/');
      const [usecase, version] = usecaseAndVersion.split('@');
      if (!mapName) {
        throw new CLIError('Missing map name argument', { exit: 1 });
      }
      this.checkInput(scope, usecase, version, mapName);
      await createMap(scope, usecase, mapName, { logCb: this.logCallback });
    } else if (type === 'provider') {
      const providerName = argv[1];
      if (!isValidProviderName(providerName)) {
        throw new CLIError(`Invalid provider name: "${providerName}"`, {
          exit: 1,
        });
      }
      await createProvider(providerName, { logCb: this.logCallback });
    }
  }

  private checkInput(
    scope: string,
    usecase: string,
    version: string,
    mapName?: string
  ): void {
    //Check scope
    if (!isValidDocumentName(scope)) {
      throw new CLIError(`Invalid scope: "${scope}"`, { exit: 1 });
    }
    //Check usecase
    if (!isValidDocumentName(usecase)) {
      throw new CLIError(`Invalid usecase: "${usecase}"`, { exit: 1 });
    }
    //Check version
    if (!isValidVersionString(version)) {
      throw new CLIError(`Invalid version string: "${version}"`, { exit: 1 });
    }
    //Check map name
    if (mapName) {
      if (!isValidDocumentName(mapName)) {
        throw new CLIError(`Invalid mapName string: "${mapName}"`, { exit: 1 });
      }
    }
  }
}
