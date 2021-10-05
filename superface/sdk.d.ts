export { AddressCleanAddressProfile } from "./types/address/clean-address";
export { AddressGeocodingProfile } from "./types/address/geocoding";
export { CommunicationEmailTemplatesProfile } from "./types/communication/email-templates";
export { CommunicationSendEmailProfile } from "./types/communication/send-email";
export { CommunicationSendMessageProfile } from "./types/communication/send-message";
export { CommunicationSendSmsProfile } from "./types/communication/send-sms";
export { CommunicationSendTemplatedEmailProfile } from "./types/communication/send-templated-email";
export { DeliveryTrackingShipmentInfoProfile } from "./types/delivery-tracking/shipment-info";
export { StarwarsCharacterInformationProfile } from "./types/starwars/character-information";
export { VcsPullRequestProfile } from "./types/vcs/pull-request";
export { VcsPullRequestsProfile } from "./types/vcs/pull-requests";
export { VcsSingleFileContentProfile } from "./types/vcs/single-file-content";
export { VcsUserReposProfile } from "./types/vcs/user-repos";
export { WeatherCurrentCityProfile } from "./types/weather/current-city";
export { WeatherForecastCityProfile } from "./types/weather/forecast-city";
export declare const SuperfaceClient: new () => import("@superfaceai/one-sdk/dist/client/client").TypedSuperfaceClient<{
    "weather/forecast-city": {
        GetWeatherForecastInCity: [import("./types/weather/forecast-city").WeatherForecastCityGetWeatherForecastInCityInput, import("./types/weather/forecast-city").WeatherForecastCityGetWeatherForecastInCityResult];
    };
    "weather/current-city": {
        GetCurrentWeatherInCity: [import("./types/weather/current-city").WeatherCurrentCityGetCurrentWeatherInCityInput, import("./types/weather/current-city").WeatherCurrentCityGetCurrentWeatherInCityResult];
    };
    "vcs/user-repos": {
        UserRepos: [import("./types/vcs/user-repos").VcsUserReposUserReposInput, import("./types/vcs/user-repos").VcsUserReposUserReposResult];
    };
    "vcs/single-file-content": {
        SingleFileContent: [import("./types/vcs/single-file-content").VcsSingleFileContentSingleFileContentInput, import("./types/vcs/single-file-content").VcsSingleFileContentSingleFileContentResult];
    };
    "vcs/pull-requests": {
        PullRequests: [import("./types/vcs/pull-requests").VcsPullRequestsPullRequestsInput, import("./types/vcs/pull-requests").VcsPullRequestsPullRequestsResult];
    };
    "vcs/pull-request": {
        PullRequest: [import("./types/vcs/pull-request").VcsPullRequestPullRequestInput, import("./types/vcs/pull-request").VcsPullRequestPullRequestResult];
    };
    "starwars/character-information": {
        RetrieveCharacterInformation: [import("./types/starwars/character-information").StarwarsCharacterInformationRetrieveCharacterInformationInput, import("./types/starwars/character-information").StarwarsCharacterInformationRetrieveCharacterInformationResult];
    };
    "delivery-tracking/shipment-info": {
        ShipmentInfo: [import("./types/delivery-tracking/shipment-info").DeliveryTrackingShipmentInfoShipmentInfoInput, import("./types/delivery-tracking/shipment-info").DeliveryTrackingShipmentInfoShipmentInfoResult];
    };
    "communication/send-templated-email": {
        SendTemplatedEmail: [import("./types/communication/send-templated-email").CommunicationSendTemplatedEmailSendTemplatedEmailInput, import("./types/communication/send-templated-email").CommunicationSendTemplatedEmailSendTemplatedEmailResult];
    };
    "communication/send-sms": {
        SendMessage: [import("./types/communication/send-sms").CommunicationSendSmsSendMessageInput, import("./types/communication/send-sms").CommunicationSendSmsSendMessageResult];
        RetrieveMessageStatus: [import("./types/communication/send-sms").CommunicationSendSmsRetrieveMessageStatusInput, import("./types/communication/send-sms").CommunicationSendSmsRetrieveMessageStatusResult];
    };
    "communication/send-message": {
        SendMessage: [import("./types/communication/send-message").CommunicationSendMessageSendMessageInput, import("./types/communication/send-message").CommunicationSendMessageSendMessageResult];
    };
    "communication/send-email": {
        SendEmail: [import("./types/communication/send-email").CommunicationSendEmailSendEmailInput, import("./types/communication/send-email").CommunicationSendEmailSendEmailResult];
    };
    "communication/email-templates": {
        ListTemplates: [any, import("./types/communication/email-templates").CommunicationEmailTemplatesListTemplatesResult];
        GetTemplateContent: [import("./types/communication/email-templates").CommunicationEmailTemplatesGetTemplateContentInput, import("./types/communication/email-templates").CommunicationEmailTemplatesGetTemplateContentResult];
        CreateTemplate: [import("./types/communication/email-templates").CommunicationEmailTemplatesCreateTemplateInput, import("./types/communication/email-templates").CommunicationEmailTemplatesCreateTemplateResult];
        UpdateTemplate: [import("./types/communication/email-templates").CommunicationEmailTemplatesUpdateTemplateInput, import("./types/communication/email-templates").CommunicationEmailTemplatesUpdateTemplateResult];
    };
    "address/geocoding": {
        Geocode: [import("./types/address/geocoding").AddressGeocodingGeocodeInput, import("./types/address/geocoding").AddressGeocodingGeocodeResult];
        ReverseGeocode: [import("./types/address/geocoding").AddressGeocodingReverseGeocodeInput, import("./types/address/geocoding").AddressGeocodingReverseGeocodeResult];
    };
    "address/clean-address": {
        CleanAddress: [import("./types/address/clean-address").AddressCleanAddressCleanAddressInput, import("./types/address/clean-address").AddressCleanAddressCleanAddressResult];
    };
}>;
export declare type SuperfaceClient = InstanceType<typeof SuperfaceClient>;
