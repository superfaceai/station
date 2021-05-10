import { createTypedClient } from "@superfaceai/one-sdk";

import { addressGeocoding } from "./types/address/geocoding";

export { AddressGeocodingProfile } from "./types/address/geocoding";
export const typeDefinitions = {
    ...addressGeocoding
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
