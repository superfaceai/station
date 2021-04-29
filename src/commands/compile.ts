import { flags } from '@oclif/command';
import { grey } from 'chalk';

import { Command } from '../common';
import { compile } from '../logic';

export default class Compile extends Command {
  static strict = false;

  static description =
    'Compiles every profile and map from capabilities directory to superface/grid directory';

  static args = [];

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

  private logCallback?= (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { flags } = this.parse(Compile);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    await compile(flags.generate, { logCb: this.logCallback });
  }
}
