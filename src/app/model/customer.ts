export interface ICustomer {
    CUSTOMER_NUMBER: string;
    SHORT_NAME: string;
    IS_INDIVIDUAL: string;
    NATIONALITY: string;
    NATIONALITY_NUMBER: string;
    NATIONALITY_DESCRIPTION: string;
    STREET_ADDRESS: string;
    ADDRESS_LINE2: string[]; // Assuming it's an array of strings
    ADDRESS_LINE3: string[]; // Assuming it's an array of strings
    TOWN_COUNTRY: string;
    POST_CODE: string[]; // Assuming it's an array of strings
    COUNTRY: string;
    COUNTRY_CODE: string;
    COUNTRY_CODE_NUMBER: string;
    DISPATCH_CODE: string;
    COMMUNICATION_CHANNEL: string;
    PHONE_NUMBER: string;
    OFFICE_PHONE_NUMBER: string;
    FAX_NUMBER: string;
    MOBILE_OPERATORISO: string;
    MOBILE_OPERATOR_CODE: string;
    SMS_NUMBER: string;
    EMAIL: string;
  }
  