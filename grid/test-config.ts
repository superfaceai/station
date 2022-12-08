import { NockConfig } from '@superfaceai/testing';

export const nockConfig: NockConfig = {
  testInstance: expect,
};

export const buildSuperfaceTest = (global as any).buildSuperfaceTest;
