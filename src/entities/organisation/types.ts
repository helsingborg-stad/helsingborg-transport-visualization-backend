export interface IOrganisation {
  id: string;
  name: string;
  email: string;
  password: string;
  pinCode: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiration?: Date;
  createdAt: Date;
  updatedAt?: Date;
  buildToken: () => Promise<string>;
  setForgotPasswordToken: (expirationDays?: number) => void;
  setPassword: (text: string) => Promise<void>;
  setPinCode: (text: string) => Promise<void>;
  isPasswordValid: (text: string) => Promise<boolean>;
  isPinCodeValid: (text: string) => Promise<boolean>;
  clearForgotPasswordToken: () => void;
}

export type OrganisationTokenDestructured = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

export type OrganisationResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
};
