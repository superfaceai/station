import { grey, yellow } from 'chalk';

import { Command } from '../common';
import { prepareE2e } from '../logic';

export default class E2e extends Command {
  static strict = false;

  static description =
    'Prepares file structure for e2e testing of specified profile and map';

  static args = [
    {
      name: 'documentInfo',
      required: true,
      description: 'Profile name in {scope}/{usecase} shape',
    },
    {
      name: 'map',
      required: true,
      description: 'Map name',
    },
  ];

  static flags = {
    ...Command.flags,
  };

  static examples = [
    '$ station e2e sms/service twilio',
    '$ station e2e sms/service twilio -q',
  ];

  private logCallback? = (message: string) => this.log(grey(message));
  private warnCallback? = (message: string) => this.warn(yellow(message));

  async run(): Promise<void> {
    const { argv, flags } = this.parse(E2e);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    const mapName = argv[1];
    const [scope, usecase] = argv[0].split('/');

    await prepareE2e(scope, usecase, mapName, {
      logCb: this.logCallback,
      warnCb: this.warnCallback,
    });
  }
}
