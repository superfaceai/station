import { DefaultReporter } from '@jest/reporters';
import { AlertFunction, SuperfaceTest } from '@superfaceai/testing';

import { alertDev } from './alert-dev';
import { alertProd } from './alert-prod';

export default class CustomReporter
  implements Pick<DefaultReporter, 'onRunComplete'> {
  async onRunComplete(): Promise<void> {
    let alert: AlertFunction | undefined;
    const variable = process.env.TEST_ENV;

    if (variable === 'dev') {
      alert = alertDev;
    } else if (variable === 'prod') {
      alert = alertProd;
    }

    if (alert) {
      await SuperfaceTest.report(alert);
      console.log('Your report is available!');
    }
  }
}
