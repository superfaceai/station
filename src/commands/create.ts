import { CLIError } from '@oclif/errors';
import { isValidDocumentName } from '@superfaceai/ast';
import { isValidProviderName } from '@superfaceai/one-sdk';
import { grey } from 'chalk';

import { Command, parseCommandInput } from '../common';
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
    '$ station create profile sms/service@1.2.3',
    '$ station create map sms/service@1.2.3 twilio',
    '$ station create profile sms/service@1.2.3 -q',
    '$ station create provider sms/service@1.2.3 twilio',
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
      const { scope, usecase, version } = parseCommandInput(documentName);
      await createProfile(scope, usecase, version, { logCb: this.logCallback });
    } else if (type === 'map') {
      const mapName = argv[2];
      if (!mapName) {
        throw new CLIError('Missing map name argument', { exit: 1 });
      }
      if (!isValidDocumentName(mapName)) {
        throw new CLIError(`Invalid mapName string: "${mapName}"`, { exit: 1 });
      }
      const documentName = argv[1] ?? argv[0];
      const { scope, usecase, version } = parseCommandInput(documentName);
      this.logCallback?.(`Creating new map: "${mapName}"`);
      await createMap(scope, usecase, version, mapName, {
        logCb: this.logCallback,
      });
    } else if (type === 'provider') {
      const providerName = argv[2];
      const documentName = argv[1] ?? argv[0];
      const { scope, usecase, version } = parseCommandInput(documentName);

      if (!providerName) {
        throw new CLIError('Missing map name argument', { exit: 1 });
      }
      if (!isValidProviderName(providerName)) {
        throw new CLIError(`Invalid provider name: "${providerName}"`, {
          exit: 1,
        });
      }
      this.logCallback?.(`Creating new provider: "${providerName}"`);

      await createProvider(providerName, scope, usecase, version, {
        logCb: this.logCallback,
      });
    }
  }
}
