"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperfaceClient = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var send_sms_1 = require("./types/communication/send-sms");
var user_repos_1 = require("./types/vcs/user-repos");
var pull_requests_1 = require("./types/vcs/pull-requests");
var single_file_content_1 = require("./types/vcs/single-file-content");
var clean_address_1 = require("./types/address/clean-address");
var send_email_1 = require("./types/communication/send-email");
var send_templated_email_1 = require("./types/communication/send-templated-email");
var character_information_1 = require("./types/starwars/character-information");
var pull_request_1 = require("./types/vcs/pull-request");
var geocoding_1 = require("./types/address/geocoding");
var shipment_info_1 = require("./types/delivery-tracking/shipment-info");
var email_templates_1 = require("./types/communication/email-templates");
var send_message_1 = require("./types/communication/send-message");
var current_city_1 = require("./types/weather/current-city");
var forecast_city_1 = require("./types/weather/forecast-city");
var synthesis_1 = require("./types/speech/synthesis");
var face_detection_1 = require("./types/computer-vision/face-detection");
var exchange_rate_1 = require("./types/crypto/exchange-rate");
var contacts_1 = require("./types/crm/contacts");
var translate_1 = require("./types/language/translate");
var analyze_plain_text_sentiment_1 = require("./types/language/analyze-plain-text-sentiment");
var typeDefinitions = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, send_sms_1.communicationSendSms), user_repos_1.vcsUserRepos), pull_requests_1.vcsPullRequests), single_file_content_1.vcsSingleFileContent), clean_address_1.addressCleanAddress), send_email_1.communicationSendEmail), send_templated_email_1.communicationSendTemplatedEmail), character_information_1.starwarsCharacterInformation), pull_request_1.vcsPullRequest), geocoding_1.addressGeocoding), shipment_info_1.deliveryTrackingShipmentInfo), email_templates_1.communicationEmailTemplates), send_message_1.communicationSendMessage), current_city_1.weatherCurrentCity), forecast_city_1.weatherForecastCity), synthesis_1.speechSynthesis), face_detection_1.computerVisionFaceDetection), exchange_rate_1.cryptoExchangeRate), contacts_1.crmContacts), translate_1.languageTranslate), analyze_plain_text_sentiment_1.languageAnalyzePlainTextSentiment);
exports.SuperfaceClient = one_sdk_1.createTypedClient(typeDefinitions);
