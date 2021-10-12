export { CommunicationSendSmsProfile } from "./types/communication/send-sms";
export { VcsUserReposProfile } from "./types/vcs/user-repos";
export { VcsPullRequestsProfile } from "./types/vcs/pull-requests";
export { VcsSingleFileContentProfile } from "./types/vcs/single-file-content";
export { AddressCleanAddressProfile } from "./types/address/clean-address";
export { CommunicationSendEmailProfile } from "./types/communication/send-email";
export { CommunicationSendTemplatedEmailProfile } from "./types/communication/send-templated-email";
export { StarwarsCharacterInformationProfile } from "./types/starwars/character-information";
export { VcsPullRequestProfile } from "./types/vcs/pull-request";
export { AddressGeocodingProfile } from "./types/address/geocoding";
export { DeliveryTrackingShipmentInfoProfile } from "./types/delivery-tracking/shipment-info";
export { CommunicationEmailTemplatesProfile } from "./types/communication/email-templates";
export { CommunicationSendMessageProfile } from "./types/communication/send-message";
export { WeatherCurrentCityProfile } from "./types/weather/current-city";
export { SpeechSynthesisProfile } from "./types/speech/synthesis";
export { IdentityFaceDetectionProfile } from "./types/identity/face-detection";
export declare const SuperfaceClient: new () => import("@superfaceai/one-sdk/dist/client/client").TypedSuperfaceClient<{
    "identity/face-detection": {
        FaceDetection: [import("./types/identity/face-detection").IdentityFaceDetectionFaceDetectionInput, import("./types/identity/face-detection").IdentityFaceDetectionFaceDetectionResult];
    };
    "speech/synthesis": {
        TextToSpeechSynthesis: [import("./types/speech/synthesis").SpeechSynthesisTextToSpeechSynthesisInput, import("./types/speech/synthesis").SpeechSynthesisTextToSpeechSynthesisResult];
    };
    "weather/current-city": {
        GetCurrentWeatherInCity: [import("./types/weather/current-city").WeatherCurrentCityGetCurrentWeatherInCityInput, import("./types/weather/current-city").WeatherCurrentCityGetCurrentWeatherInCityResult];
    };
    "communication/send-message": {
        SendMessage: [import("./types/communication/send-message").CommunicationSendMessageSendMessageInput, import("./types/communication/send-message").CommunicationSendMessageSendMessageResult];
    };
    "communication/email-templates": {
        ListTemplates: [any, import("./types/communication/email-templates").CommunicationEmailTemplatesListTemplatesResult];
        GetTemplateContent: [import("./types/communication/email-templates").CommunicationEmailTemplatesGetTemplateContentInput, import("./types/communication/email-templates").CommunicationEmailTemplatesGetTemplateContentResult];
        CreateTemplate: [import("./types/communication/email-templates").CommunicationEmailTemplatesCreateTemplateInput, import("./types/communication/email-templates").CommunicationEmailTemplatesCreateTemplateResult];
        UpdateTemplate: [import("./types/communication/email-templates").CommunicationEmailTemplatesUpdateTemplateInput, import("./types/communication/email-templates").CommunicationEmailTemplatesUpdateTemplateResult];
    };
    "delivery-tracking/shipment-info": {
        ShipmentInfo: [import("./types/delivery-tracking/shipment-info").DeliveryTrackingShipmentInfoShipmentInfoInput, import("./types/delivery-tracking/shipment-info").DeliveryTrackingShipmentInfoShipmentInfoResult];
    };
    "address/geocoding": {
        Geocode: [import("./types/address/geocoding").AddressGeocodingGeocodeInput, import("./types/address/geocoding").AddressGeocodingGeocodeResult];
        ReverseGeocode: [import("./types/address/geocoding").AddressGeocodingReverseGeocodeInput, import("./types/address/geocoding").AddressGeocodingReverseGeocodeResult];
    };
    "vcs/pull-request": {
        PullRequest: [import("./types/vcs/pull-request").VcsPullRequestPullRequestInput, import("./types/vcs/pull-request").VcsPullRequestPullRequestResult];
    };
    "starwars/character-information": {
        RetrieveCharacterInformation: [import("./types/starwars/character-information").StarwarsCharacterInformationRetrieveCharacterInformationInput, import("./types/starwars/character-information").StarwarsCharacterInformationRetrieveCharacterInformationResult];
    };
    "communication/send-templated-email": {
        SendTemplatedEmail: [import("./types/communication/send-templated-email").CommunicationSendTemplatedEmailSendTemplatedEmailInput, import("./types/communication/send-templated-email").CommunicationSendTemplatedEmailSendTemplatedEmailResult];
    };
    "communication/send-email": {
        SendEmail: [import("./types/communication/send-email").CommunicationSendEmailSendEmailInput, import("./types/communication/send-email").CommunicationSendEmailSendEmailResult];
    };
    "address/clean-address": {
        CleanAddress: [import("./types/address/clean-address").AddressCleanAddressCleanAddressInput, import("./types/address/clean-address").AddressCleanAddressCleanAddressResult];
    };
    "vcs/single-file-content": {
        SingleFileContent: [import("./types/vcs/single-file-content").VcsSingleFileContentSingleFileContentInput, import("./types/vcs/single-file-content").VcsSingleFileContentSingleFileContentResult];
    };
    "vcs/pull-requests": {
        PullRequests: [import("./types/vcs/pull-requests").VcsPullRequestsPullRequestsInput, import("./types/vcs/pull-requests").VcsPullRequestsPullRequestsResult];
    };
    "vcs/user-repos": {
        UserRepos: [import("./types/vcs/user-repos").VcsUserReposUserReposInput, import("./types/vcs/user-repos").VcsUserReposUserReposResult];
    };
    "communication/send-sms": {
        SendMessage: [import("./types/communication/send-sms").CommunicationSendSmsSendMessageInput, import("./types/communication/send-sms").CommunicationSendSmsSendMessageResult];
        RetrieveMessageStatus: [import("./types/communication/send-sms").CommunicationSendSmsRetrieveMessageStatusInput, import("./types/communication/send-sms").CommunicationSendSmsRetrieveMessageStatusResult];
    };
}>;
export declare type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
