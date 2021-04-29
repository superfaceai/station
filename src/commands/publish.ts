import { flags } from '@oclif/command';
import { grey } from 'chalk';

import { Command } from '../common';
import { publish } from '../logic';

export default class Publish extends Command {
  static strict = false;

  static description =
    'Uploads map/profile/provider to Store - use paths to `.supr` file for profiles, `.suma` for maps and `.json` for providers. Do not use path ending with `.ast.json` (compiled files).';

  static args = [
    {
      name: 'path',
      required: true,
      description: 'Path to profile, map or provider',
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
    '$ station publish capabilities/vcs/user-repos/maps/bitbucket.suma',
    '$ station publish capabilities/vcs/user-repos/maps/bitbucket.suma -p',
    '$ station publish capabilities/vcs/user-repos/maps/bitbucket.suma -q',
  ];

  private logCallback? = (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { argv, flags } = this.parse(Publish);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    const path = argv[0];
    await publish(path, { logCb: this.logCallback });
  }
}
