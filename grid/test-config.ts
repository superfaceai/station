import {
  NockConfig,
  SuperfaceTest,
  SuperfaceTestConfig,
} from '@superfaceai/testing';

export const nockConfig: NockConfig = {
  testInstance: expect,
};

/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
export const buildSuperfaceTest = (global as any).buildSuperfaceTest as (
  options?: SuperfaceTestConfig
) => SuperfaceTest;
