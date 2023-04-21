import { UserTypes } from '@root/entities';
import { isOfUserType } from './isOfUserType';

export const isAdmin = isOfUserType([UserTypes.ADMIN]);
