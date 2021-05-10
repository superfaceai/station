import { createTypedClient } from "@superfaceai/one-sdk";

import { addressCleanAddress } from "./types/address/clean-address";

export { AddressCleanAddressProfile } from "./types/address/clean-address";
export const typeDefinitions = {
    ...addressCleanAddress
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
