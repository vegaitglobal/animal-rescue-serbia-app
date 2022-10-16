export type NewReport = {
  firstName: string;
  lastName: string;
};

export type ViolationCategories = {
  id: string;
  name: string;
  isEnabled: boolean;
};

export type Locations = {
  locations: string[];
};

export type Violations = {
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
  violations: Violations;
};
