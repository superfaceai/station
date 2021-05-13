import { createTypedClient } from "@superfaceai/one-sdk";

import { addressCleanAddress } from "./types/address/clean-address";
import { addressGeocoding } from "./types/address/geocoding";
import { communicationSendEmail } from "./types/communication/send-email";
import { communicationSendMessage } from "./types/communication/send-message";
import { communicationSendSms } from "./types/communication/send-sms";
import { deliveryTrackingShipmentInfo } from "./types/delivery-tracking/shipment-info";
import { vcsPullRequest } from "./types/vcs/pull-request";
import { vcsPullRequests } from "./types/vcs/pull-requests";
import { vcsSingleFileContent } from "./types/vcs/single-file-content";
import { vcsUserRepos } from "./types/vcs/user-repos";

export { AddressCleanAddressProfile } from "./types/address/clean-address";
export { AddressGeocodingProfile } from "./types/address/geocoding";
export { CommunicationSendEmailProfile } from "./types/communication/send-email";
export { CommunicationSendMessageProfile } from "./types/communication/send-message";
export { VcsPullRequestProfile } from "./types/vcs/pull-request";
export { VcsPullRequestsProfile } from "./types/vcs/pull-requests";
export { VcsSingleFileContentProfile } from "./types/vcs/single-file-content";
export { VcsUserReposProfile } from "./types/vcs/user-repos";
export { DeliveryTrackingShipmentInfoProfile } from "./types/delivery-tracking/shipment-info";
import { starwarsCharacterInformation } from './types/starwars/character-information';
export { StarwarsCharacterInformationProfile } from "./types/starwars/character-information";
export { CommunicationSendSmsProfile } from "./types/communication/send-sms";
export const typeDefinitions = {
    ...addressCleanAddress,
    ...addressGeocoding,
    ...communicationSendEmail,
    ...communicationSendMessage,
    ...vcsPullRequest,
    ...deliveryTrackingShipmentInfo,
    ...vcsPullRequests,
    ...vcsSingleFileContent,
    ...vcsUserRepos,
    ...starwarsCharacterInformation,
    ...communicationSendSms,
};
export const SuperfaceClient = createTypedClient(typeDefinitions);
export type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
