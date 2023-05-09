export type LoginBody = {
  identifier: string;
  password?: string;
  pinCode?: string;
};

export type SignupBody = {
  orgNumber: string;
  name: string;
  email: string;
  contactPerson: string;
  mobileNumber: string;
  password: string;
  pinCode: string;
};

export type ForgotPasswordBody = {
  identifier: string;
};

export type ResetPasswordBody = {
  token: string;
  password: string;
};
