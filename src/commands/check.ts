import { grey } from 'chalk';

import { Command } from '../common';
import { check } from '../logic/check';

export default class Check extends Command {
  static strict = false;

  static description =
    'Checks if all profiles have maps with coresponding version, scope, name, usecase definitions and providers';

  static args = [];

  static flags = {
    ...Command.flags,
  };

  static examples = ['$ station check', '$ station check -q'];

  private logCallback? = (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { flags } = this.parse(Check);

    if (flags.quiet) {
      this.logCallback = undefined;
    }
    //TODO: Compile before check
    await check({ logCb: this.logCallback });
  }
}
