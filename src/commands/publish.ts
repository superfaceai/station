import { flags } from '@oclif/command';
import { grey } from 'chalk';
import inquirer from 'inquirer';

import { Command, SF_API_URL_VARIABLE, SF_PRODUCTION } from '../common';
import { check, publish, publishAll } from '../logic';

export default class Publish extends Command {
  static strict = false;

  static description =
    'Uploads map/profile/provider to Store - use paths to `.supr` file for profiles, `.suma` for maps and `.json` for providers. Do not use path ending with `.ast.json` (compiled files).';

  static args = [
    {
      name: 'path',
      description: 'Path to profile, map or provider',
    },
  ];

  static flags = {
    ...Command.flags,
    'dry-run': flags.boolean({
      default: false,
      description: 'Runs without sending actual request.',
    }),
    force: flags.boolean({
      char: 'f',
      default: false,
      description: 'Publishes without asking any confirmation.',
    }),
  };

  static examples = [
    '$ station publish',
    '$ station publish --dry-run',
    '$ station publish --force',
    '$ station publish capabilities/vcs/user-repos/maps/bitbucket.suma',
    '$ station publish capabilities/vcs/user-repos/maps/bitbucket.suma -q',
  ];

  private logCallback? = (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { argv, flags } = this.parse(Publish);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    await check({ logCb: this.logCallback });

    const baseUrl = process.env[SF_API_URL_VARIABLE] || SF_PRODUCTION;

    if (baseUrl === SF_PRODUCTION && !flags.force) {
      const response: { upload: boolean } = await inquirer.prompt({
        name: 'upload',
        message:
          'Are you sure that you want to upload data to PRODUCTION server?',
        type: 'confirm',
      });

      if (!response.upload) {
        this.exit(0);
      }
    }

    const path = argv[0];
    const options = {
      logCb: this.logCallback,
      dryRun: flags['dry-run'],
    };

    if (path) {
      await publish(path, baseUrl, options);
    } else {
      await publishAll(baseUrl, options);
    }
  }
}
