export type LoginBody = {
  email: string;
  password: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type ResetPasswordBody = {
  token: string;
  password: string;
};
