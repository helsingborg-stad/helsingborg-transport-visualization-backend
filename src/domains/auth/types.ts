import { IUser } from '@root/entities';

export type AuthDTO = {
  id: number;
  token?: string;
  userType: string;
  freightCompanyId: number;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
};

export interface IAuthRepo {
  findByEmail(email: string): Promise<IUser | null>;
  findById: (id: number) => Promise<IUser | null>;
  findByForgotPasswordToken(token: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
}
