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
var clean_address_1 = require("./types/address/clean-address");
var geocoding_1 = require("./types/address/geocoding");
var email_templates_1 = require("./types/communication/email-templates");
var send_email_1 = require("./types/communication/send-email");
var send_message_1 = require("./types/communication/send-message");
var send_sms_1 = require("./types/communication/send-sms");
var shipment_info_1 = require("./types/delivery-tracking/shipment-info");
var character_information_1 = require("./types/starwars/character-information");
var pull_request_1 = require("./types/vcs/pull-request");
var pull_requests_1 = require("./types/vcs/pull-requests");
var single_file_content_1 = require("./types/vcs/single-file-content");
var user_repos_1 = require("./types/vcs/user-repos");
var get_weather_1 = require("./types/weather/get-weather");
var typeDefinitions = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, clean_address_1.addressCleanAddress), geocoding_1.addressGeocoding), email_templates_1.communicationEmailTemplates), send_email_1.communicationSendEmail), send_message_1.communicationSendMessage), send_sms_1.communicationSendSms), shipment_info_1.deliveryTrackingShipmentInfo), character_information_1.starwarsCharacterInformation), pull_request_1.vcsPullRequest), pull_requests_1.vcsPullRequests), single_file_content_1.vcsSingleFileContent), user_repos_1.vcsUserRepos), get_weather_1.weatherGetWeather);
exports.SuperfaceClient = one_sdk_1.createTypedClient(typeDefinitions);
