import { IOrganisation } from '@root/entities';
import { AuthDTO } from './types';

export const toAuthDTO = async (
  organisation: IOrganisation,
  isPasswordAuthenticated: boolean = false,
  buildToken: boolean = true
): Promise<AuthDTO> => ({
  id: organisation.id,
  orgNumber: organisation.orgNumber,
  email: organisation.email,
  name: organisation.name,
  contactPerson: organisation.contactPerson,
  mobileNumber: organisation.mobileNumber,
  token: buildToken ? await organisation.buildToken(isPasswordAuthenticated) : undefined,
  isPublic: organisation.isPublic,
  createdAt: organisation.createdAt,
  updatedAt: organisation.updatedAt,
});
