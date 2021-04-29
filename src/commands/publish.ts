import { flags } from '@oclif/command';
import { grey } from 'chalk';

import { Command } from '../common';
import { publish } from '../logic';

export default class Publish extends Command {
  static strict = false;

  static description =
    'Creates empty map, profile or provider on a local filesystem.';

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
    '$ superface create profile sms/service',
    '$ superface create profile sms/service -u SendSMS ReceiveSMS',
    '$ superface create map sms/service -p twilio',
    '$ superface create map sms/service -p twilio -u SendSMS ReceiveSMS',
    '$ superface create sms/service -p twilio -u SendSMS ReceiveSMS',
    '$ superface create sms/service -p twilio -t bugfix -v 1.1-rev133 -u SendSMS ReceiveSMS',
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
