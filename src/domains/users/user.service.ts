import { IUser, User, UserTypes } from '@root/entities';
import { IUserRepository, UserRepository } from '@root/repositories';
import { AdminCreateType, DriverCreateType } from './types';

export interface IUserService {
  getAllUsers: () => Promise<IUser[]>;
  createAdmin: (user: AdminCreateType) => Promise<IUser>;
  createDriver: (user: DriverCreateType) => Promise<IUser>;
}

export class UserService implements IUserService {
  constructor(private repo: IUserRepository = new UserRepository()) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.repo.getAllUsers();
  }

  async createAdmin(userData: AdminCreateType): Promise<IUser> {
    const user = new User(userData.email);
    user.userType = UserTypes.ADMIN;
    if (userData.freightCompanyId) {
      user.freightCompanyId = userData.freightCompanyId;
    }
    await user.setPassword(userData.password);
    return this.repo.save(user);
  }

  async createDriver(userData: DriverCreateType): Promise<IUser> {
    const user = new User(userData.email);
    user.userType = UserTypes.DRIVER;
    user.freightCompanyId = userData.freightCompanyId;
    await user.setPassword(userData.password);
    return this.repo.save(user);
  }
}
