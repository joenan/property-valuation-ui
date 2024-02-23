export interface Customer {
  id?: number,
  customerNumber: string,
  shortName: string,
  nationality: string,
  nationalityNumber: string,
  nationalityDescription: string,
  streetAddress: string,
  addressLine2: string,
  addressLine3: string,
  townCountry: string,
  postCode: number,
  country: string,
  countryCode: string,
  countryCodeNumber: string,
  dispatchCode: string,
  communicationChannel: string,
  phoneNumber: string,
  officePhoneNumber: string,
  faxNumber: string,
  mobileOperatorISO: string,
  mobileOperatorCode: string,
  smsNumber: string,
  email: string,
  individual: boolean
  }
  

  // Borrower interface
export interface IBorrower {
  id: number;
  customerNumber: string;
  shortName: string;
  nationality: string;
  nationalityNumber: string;
  nationalityDescription: string;
  streetAddress: string;
  addressLine2: string;
  addressLine3: string;
  townCountry: string;
  postCode: number;
  country: string;
  countryCode: string;
  countryCodeNumber: string;
  dispatchCode: string;
  communicationChannel: string;
  phoneNumber: string;
  officePhoneNumber: string;
  faxNumber: string;
  mobileOperatorISO: string;
  mobileOperatorCode: string;
  smsNumber: string;
  email: string;
  individual: boolean;
}

// FacilityDetails interface
export interface IFacilityDetails {
  id: number;
  facilityType: string;
  category: string;
  purposeOfPropertyValuation: string;
  termInMonths: number;
  currency: string;
  amount: number;
  propertyValuation: string;
}

// Facility model
export interface Facility {
  id: number;
  facilityType: string;
  category: string;
  purpose: number;
  termMonths: number;
  currency: string;
  amount: number;
  fosReference: string;
  reference: string;
  evaluationType: string;
  borrowers: IBorrower[];
  facilityDetails: IFacilityDetails;
}
export interface IComment {
  id: number;
  date: string; // Assuming the date will be in ISO 8601 format
  username: string;
  commentText: string;
  propertyValuationId: number;
}