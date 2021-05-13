import { CLIError } from '@oclif/errors';
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
      const [scope, usecase] = documentName.split('/');
      await createProfile(scope, usecase, { logCb: this.logCallback });

      // Create map for mock provider
      await createMap(scope, usecase, 'mock', { logCb: this.logCallback });
    } else if (type === 'map') {
      const mapName = argv[2];
      const documentName = argv[1] ?? argv[0];
      const [scope, usecase] = documentName.split('/');
      if (!mapName) {
        throw new CLIError('Missing map name argument', { exit: 1 });
      }
      await createMap(scope, usecase, mapName, { logCb: this.logCallback });
    } else if (type === 'provider') {
      const providerName = argv[1];
      await createProvider(providerName, { logCb: this.logCallback });
    }
  }
}
