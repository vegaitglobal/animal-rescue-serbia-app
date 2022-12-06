import {
  LiteViolationResponseDto,
  ViolationResponseDto,
  UsersDto,
} from '../../../infrastructure/apiTypes';

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

export type FormFile = {
  name: string;
  type: string;
  uri: string;
};

export type Violation = {
  location: string;
  violationCategoryId: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  files: FormFile[];
  description: string;
};

export type ViolationFilter = {
  location: string;
  violationCategoryId: string;
};

export type ReportState = {
  violationCategories: ViolationCategories[];
  locations: Locations;
  newViolation: Violation;
  violations: ViolationResponseDto[];
  liteViolations: LiteViolationResponseDto[];
  violationsFilter: ViolationFilter;
  users: UsersDto;
};
