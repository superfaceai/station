import { CLIError } from '@oclif/errors';
import { grey } from 'chalk';

import { Command, parseCommandInput } from '../common';
import { generate } from '../logic';

export default class Compile extends Command {
  static strict = false;

  static description =
    'Generates .ts files into `superface/types/{scope}` folder, creates or updates `superface/sdk.ts` file and creates or updates `superface/types/{scope}/index.d.ts` file.';

  static args = [
    {
      name: 'profileName',
      required: true,
      description: 'Profile name in {scope}/{usecase} shape',
    },
  ];

  static flags = {
    ...Command.flags,
  };

  static examples = [
    '$ station generate sms/service@1.2.3',
    '$ station generate sms/service@1.2.3 -q',
  ];

  private logCallback? = (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { argv, flags } = this.parse(Compile);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    if (argv.length !== 1) {
      throw new CLIError('Invalid number of arguments', { exit: 1 });
    }

    const { scope, usecase, version } = parseCommandInput(argv[0]);

    await generate(scope, usecase, version, { logCb: this.logCallback });
  }
}
