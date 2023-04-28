export type LoginBody = {
  identifier: string;
  password?: string;
  pinCode?: string;
};

export type SignupBody = {
  id: string;
  name: string;
  email: string;
  password: string;
  pinCode: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type ResetPasswordBody = {
  token: string;
  password: string;
};
