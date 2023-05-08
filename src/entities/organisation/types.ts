export interface IOrganisation {
  id: string;
  orgNumber: string;
  name: string;
  email: string;
  contactPerson: string;
  mobileNumber: string;
  password: string;
  pinCode: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiration?: Date;
  createdAt: Date;
  updatedAt?: Date;
  buildToken: (isPasswordAuthenticated: boolean) => Promise<string>;
  setForgotPasswordToken: (expirationDays?: number) => void;
  setPassword: (text: string) => Promise<void>;
  setPinCode: (text: string) => Promise<void>;
  isPasswordValid: (text: string) => Promise<boolean>;
  isPinCodeValid: (text: string) => Promise<boolean>;
  clearForgotPasswordToken: () => void;
}

export type OrganisationTokenDestructured = {
  id: string;
  orgNumber: string;
  email: string;
  name: string;
  isPasswordAuthenticated: boolean;
  createdAt: Date;
};

export type OrganisationResponse = {
  id: string;
  orgNumber: string;
  mobileNumber: string;
  contactPerson: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
};
