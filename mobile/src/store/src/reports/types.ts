export type NewReport = {
  firstName: string;
  lastName: string;
};

export type ViolationCategories = {
  id: string;
  name: string;
  isEnabled: boolean;
};

export type Locations = string[];

export type Violation = {
  location: string;
  violationCategoryId: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  files: string[];
  desctiption: string;
};

export type ReportState = {
  // newReport: NewReport;
  violationCategories: ViolationCategories[];
  locations: Locations;
  violations: Violation;
};
