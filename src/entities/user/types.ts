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
  createdAt: Date;
  updatedAt?: Date;
  buildToken: () => Promise<string>;
  setPassword: (text: string) => Promise<void>;
  isPasswordValid: (text: string) => Promise<boolean>;
}
