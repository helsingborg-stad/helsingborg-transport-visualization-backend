import { IUser } from '@root/entities';
import { AuthDTO } from './types';

export const toAuthDTO = async (user: IUser, buildToken: boolean = true): Promise<AuthDTO> => ({
  id: user.id,
  userType: user.userType,
  token: buildToken ? await user.buildToken() : undefined,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
