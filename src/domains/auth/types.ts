import { IOrganisation } from '@root/entities';

export type AuthDTO = {
  id: string;
  orgNumber: string;
  name: string;
  email: string;
  token?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export interface IAuthRepo {
  findByOrgNumberOrEmail(identifier: string): Promise<IOrganisation | null>;
  findByEmail: (email: string) => Promise<IOrganisation | null>;
  findById: (id: string) => Promise<IOrganisation | null>;
  findByOrgNumber: (orgNumber: string) => Promise<IOrganisation | null>;
  findByForgotPasswordToken(token: string): Promise<IOrganisation | null>;
  save(organisation: IOrganisation): Promise<IOrganisation>;
}
