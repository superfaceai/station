"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crmContacts = void 0;
var one_sdk_1 = require("@superfaceai/one-sdk");
var profile = {
    /**
     * Create Contact
     * Create single contact in CRM
     **/
    "Create": one_sdk_1.typeHelper(),
    /**
     * Update Contact
     * Update single contact matched by id or email
     **/
    "Update": one_sdk_1.typeHelper(),
    /**
     * Search contact
     * Search contact by it's property value
     **/
    "Search": one_sdk_1.typeHelper()
};
exports.crmContacts = {
    "crm/contacts": profile
};
