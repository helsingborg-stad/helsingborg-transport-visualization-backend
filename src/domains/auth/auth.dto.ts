import { IOrganisation } from '@root/entities';
import { AuthDTO } from './types';

export const toAuthDTO = async (organisation: IOrganisation, buildToken: boolean = true): Promise<AuthDTO> => ({
  id: organisation.id,
  email: organisation.email,
  name: organisation.name,
  token: buildToken ? await organisation.buildToken() : undefined,
  createdAt: organisation.createdAt,
  updatedAt: organisation.updatedAt,
});
