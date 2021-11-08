import { TypedProfile } from '@superfaceai/one-sdk';
export declare type CrmContactsCreateInput = {
    /**
     * E-mail
     * The contact's primary email
     **/
    email?: unknown;
    /**
     * Phone
     * The contact's primary phone number
     **/
    phone?: unknown;
    /**
     * First name
     * The contact's personal name
     **/
    firstName?: unknown;
    /**
     * Last name
     * The contact's family name
     **/
    lastName?: unknown;
    /**
     * Company
     * The contact's company
     **/
    company?: unknown;
    /**
     * Country
     * The contact's country
     **/
    country?: unknown;
    /**
     * Custom fieldsproperties
     * Additional properties about the contact
     **/
    customProperties?: unknown;
};
export declare type CrmContactsCreateResult = {
    /**
     * Identifier
     * The contact's identifier
     *
     * If contact is created or up dated asynchronously it may be missing
     **/
    id?: unknown;
};
export declare type CrmContactsUpdateInput = {
    /**
     * Identifier
     * The contact's identifier
     *
     * If contact is created or up dated asynchronously it may be missing
     **/
    id?: unknown;
    /**
     * E-mail
     * The contact's primary email
     **/
    email?: unknown;
    /**
     * Phone
     * The contact's primary phone number
     **/
    phone?: unknown;
    /**
     * First name
     * The contact's personal name
     **/
    firstName?: unknown;
    /**
     * Last name
     * The contact's family name
     **/
    lastName?: unknown;
    /**
     * Company
     * The contact's company
     **/
    company?: unknown;
    /**
     * Country
     * The contact's country
     **/
    country?: unknown;
    /**
     * Custom fieldsproperties
     * Additional properties about the contact
     **/
    customProperties?: unknown;
};
export declare type CrmContactsUpdateResult = {
    /**
     * Identifier
     * The contact's identifier
     *
     * If contact is created or up dated asynchronously it may be missing
     **/
    id?: unknown;
};
export declare type CrmContactsSearchInput = {
    /**
     * Property
     * Property name to compare value with
     **/
    property: unknown;
    /**
     * Operator
     * Comparison operation
     **/
    operator: 'EQ' | 'NEQ';
    /**
     * Value
     * Value to compare against values in property
     **/
    value: unknown;
};
export declare type CrmContactsSearchResult = {
    /**
     * Identifier
     * The contact's identifier
     *
     * If contact is created or up dated asynchronously it may be missing
     **/
    id?: unknown;
    /**
     * E-mail
     * The contact's primary email
     **/
    email?: unknown;
    /**
     * Phone
     * The contact's primary phone number
     **/
    phone?: unknown;
    /**
     * First name
     * The contact's personal name
     **/
    firstName?: unknown;
    /**
     * Last name
     * The contact's family name
     **/
    lastName?: unknown;
    /**
     * Company
     * The contact's company
     **/
    company?: unknown;
    /**
     * Country
     * The contact's country
     **/
    country?: unknown;
    /**
     * Custom fieldsproperties
     * Additional properties about the contact
     **/
    customProperties?: unknown;
}[];
declare const profile: {
    /**
     * Create Contact
     * Create single contact in CRM
     **/
    Create: [CrmContactsCreateInput, CrmContactsCreateResult];
    /**
     * Update Contact
     * Update single contact matched by id or email
     **/
    Update: [CrmContactsUpdateInput, CrmContactsUpdateResult];
    /**
     * Search contact
     * Search contact by it's property value
     **/
    Search: [CrmContactsSearchInput, CrmContactsSearchResult];
};
export declare type CrmContactsProfile = TypedProfile<typeof profile>;
export declare const crmContacts: {
    "crm/contacts": {
        /**
         * Create Contact
         * Create single contact in CRM
         **/
        Create: [CrmContactsCreateInput, CrmContactsCreateResult];
        /**
         * Update Contact
         * Update single contact matched by id or email
         **/
        Update: [CrmContactsUpdateInput, CrmContactsUpdateResult];
        /**
         * Search contact
         * Search contact by it's property value
         **/
        Search: [CrmContactsSearchInput, CrmContactsSearchResult];
    };
};
export {};
