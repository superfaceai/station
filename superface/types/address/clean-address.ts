import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';
/** clean-address usecase **/
export interface CleanAddressInput {
  street?: unknown;
  city?: unknown;
  state?: unknown;
  zipcode?: unknown;
}
/** clean-address usecase **/
export interface CleanAddressResult {
  street?: unknown;
  city?: unknown;
  state?: unknown;
  zipcode?: unknown;
}
const profile = {
  "CleanAddress": typeHelper<CleanAddressInput, CleanAddressResult>()
};
export type AddressCleanAddressProfile = TypedProfile<typeof profile>;
export const addressCleanAddress = {
  "address/clean-address": profile
};
