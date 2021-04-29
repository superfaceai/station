import { flags } from '@oclif/command';
import { CLIError } from '@oclif/errors';
import { grey } from 'chalk';

import { Command } from '../common';
import { generate } from '../logic';

export default class Compile extends Command {
  static strict = false;

  static description =
    'Creates empty map, profile or provider on a local filesystem.';

  static args = [
    {
      name: 'profileName',
      required: true,
      description: 'Profile name in {scope}/{usecase} shape',
    },
  ];

  static flags = {
    ...Command.flags,
    generate: flags.boolean({
      char: 'g',
      default: false,
      description: 'Generate types for every compiled file.',
    }),
  };

  static examples = [
    '$ superface create profile sms/service',
    '$ superface create profile sms/service -u SendSMS ReceiveSMS',
    '$ superface create map sms/service -p twilio',
    '$ superface create map sms/service -p twilio -u SendSMS ReceiveSMS',
    '$ superface create sms/service -p twilio -u SendSMS ReceiveSMS',
    '$ superface create sms/service -p twilio -t bugfix -v 1.1-rev133 -u SendSMS ReceiveSMS',
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

    const profileName = argv[0];
    const [scope, profile] = profileName.split('/');
    await generate(scope, profile, { logCb: this.logCallback });
  }
}
