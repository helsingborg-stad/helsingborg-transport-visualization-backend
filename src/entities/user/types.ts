export enum UserTypes {
  ADMIN = 'admin',
  DRIVER = 'driver',
}

export interface IUser {
  id: number;
  userType: UserTypes;
  email: string;
  password?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiration?: Date;
  freightCompanyId?: number;
  createdAt: Date;
  updatedAt?: Date;
  buildToken: () => Promise<string>;
  setForgotPasswordToken: (expirationDays?: number) => void;
  setPassword: (text: string) => Promise<void>;
  isPasswordValid: (text: string) => Promise<boolean>;
}

export type UserTokenDestructured = {
  id: number;
  email: string;
  userType: UserTypes;
  freightCompanyId?: number;
  createdAt: Date;
};

export type UserResponse = {
  id: number;
  userType: UserTypes;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
};
