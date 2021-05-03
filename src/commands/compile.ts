import { flags } from '@oclif/command';
import { grey } from 'chalk';

import { Command } from '../common';
import { compile } from '../logic';

export default class Compile extends Command {
  static strict = false;

  static description =
    'Compiles every profile and map from capabilities directory to superface/grid directory. For now it is safer to use generate command.';

  static args = [];

  static flags = {
    ...Command.flags,
    generate: flags.boolean({
      char: 'g',
      default: false,
      description: 'Generate types for compiled files.',
    }),
  };

  static examples = [
    '$ station compile',
    '$ station compile -q',
    '$ station compile -g',
    '$ station compile --generate',
  ];

  private logCallback? = (message: string) => this.log(grey(message));

  async run(): Promise<void> {
    const { flags } = this.parse(Compile);

    if (flags.quiet) {
      this.logCallback = undefined;
    }

    await compile(flags.generate, { logCb: this.logCallback });
  }
}
