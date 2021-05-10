import { flags } from '@oclif/command';
import { CLIError } from '@oclif/errors';
import { isValidDocumentName, isValidProviderName } from '@superfaceai/ast';
import { grey } from 'chalk';
import inquirer from 'inquirer';

import {
  CAPABILITIES_DIR,
  Command,
  exists,
  EXTENSIONS,
  parseCommandInput,
  PROVIDERS_DIR,
} from '../common';
import { check, publish } from '../logic';

export default class Publish extends Command {
  static strict = false;

  static description =
    'Uploads map/profile/provider to Store - use paths to `.supr` file for profiles.';

  static args = [
    {
      name: 'documentInfo',
      required: true,
      description:
        'Two arguments containing informations about the document.\n1. Document Type - type of document that will be published (profile or map or provider).\n2. Document Name - name of a file that will be published',
    },
  ];

  static flags = {
    ...Command.flags,
    production: flags.boolean({
      char: 'p',
      default: false,
      description: 'Publish to production server.',
    }),
  };

  static examples = [
    '$ station publish profile sms/service@1.2.3',
    '$ station publish map sms/service@1.2.3 twilio',
    '$ station publish profile sms/service@1.2.3 -p',
    '$ station publish provider twilio',
  ];

  private logCallback? = (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { argv, flags } = this.parse(Publish);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    await check({ logCb: this.logCallback });

    let baseUrl = 'https://superface.dev';

    if (flags.production) {
      const response: { upload: boolean } = await inquirer.prompt({
        name: 'upload',
        message:
          'Are you sure that you want to upload data to PRODUCTION server?',
        type: 'confirm',
      });
      if (response.upload) {
        baseUrl = 'https://superface.ai';
      } else {
        this.exit(0);
      }
    }

    const type = argv[0];
    if (!type) {
      throw new CLIError(`Missing document type argument`, { exit: 1 });
    }

    let filePath: string;
    if (type === 'profile') {
      const documentName = argv[1];
      const { scope, usecase, version } = parseCommandInput(documentName);
      filePath = `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/profile${EXTENSIONS.profile.source}`;
    } else if (type === 'map') {
      const documentName = argv[1];
      const { scope, usecase, version } = parseCommandInput(documentName);
      const mapName = argv[2];
      if (!mapName) {
        throw new CLIError('Missing map name argument', { exit: 1 });
      }
      if (!isValidDocumentName(mapName)) {
        throw new CLIError(`Invalid mapName string: "${mapName}"`, { exit: 1 });
      }
      filePath = `./${CAPABILITIES_DIR}/${scope}/${usecase}/${version}/maps/${mapName}${EXTENSIONS.map.source}`;
    } else if (type === 'provider') {
      const providerName = argv[1];
      if (!providerName) {
        throw new CLIError('Missing provider name argument', { exit: 1 });
      }
      if (!isValidProviderName(providerName)) {
        throw new CLIError(`Invalid provider name string: "${providerName}"`, {
          exit: 1,
        });
      }
      filePath = `./${PROVIDERS_DIR}/${providerName}${EXTENSIONS.provider}`;
    } else {
      throw new CLIError(`Missing document type argument`, { exit: 1 });
    }

    if (!(await exists(filePath))) {
      throw new CLIError('Path does not exist', { exit: 1 });
    }
    await publish(type, filePath, baseUrl, { logCb: this.logCallback });
  }
}
