import { IUser } from '@root/entities';

export type AuthDTO = {
  id: number;
  token?: string;
  userType: string;
  email: string;
  //   isBlocked: boolean;
  //   exhibitorId?: number;
  //   organiserGroupId?: number;
  createdAt: Date;
  updatedAt?: Date;
};

export interface IAuthRepo {
  findByEmail(email: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
  //   findByForgotPasswordToken(token: string): Promise<IUser | null>;
  findById: (id: number) => Promise<IUser | null>;
}
