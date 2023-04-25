import { IUser, User, UserTypes, UserResponse } from '@root/entities';
import { IUserRepository, UserRepository } from '@root/repositories';
import { AdminCreateType, DriverCreateType } from './types';
import StatusError from '@utils/statusError';

export interface IUserService {
  getAllUsers: () => Promise<UserResponse[]>;
  createAdmin: (user: AdminCreateType) => Promise<IUser>;
  createDriver: (user: DriverCreateType) => Promise<IUser>;
}

export class UserService implements IUserService {
  constructor(private repo: IUserRepository = new UserRepository()) {}

  async getAllUsers(): Promise<UserResponse[]> {
    return this.repo.getAllUsers();
  }

  async createAdmin(userData: AdminCreateType): Promise<IUser> {
    const userExists = await this.repo.findByEmail(userData.email);
    if (userExists) {
      this.throwEmailAlreadyInUse()
    } else {
    const user = new User(userData.email);
    user.userType = UserTypes.ADMIN;
    if (userData.freightCompanyId) {
      user.freightCompanyId = userData.freightCompanyId;
    }
    await user.setPassword(userData.password);
    return this.repo.save(user);
    }
  }

  async createDriver(userData: DriverCreateType): Promise<IUser> {
      const userExists = await this.repo.findByEmail(userData.email);
      if (userExists) {
        this.throwEmailAlreadyInUse()
      } else {
        const user = new User(userData.email);
        user.userType = UserTypes.DRIVER;
        user.freightCompanyId = userData.freightCompanyId;
        await user.setPassword(userData.password);
        return this.repo.save(user);
      }
  }

  private throwEmailAlreadyInUse() {
    throw new StatusError(400, 'Email already in use.');
  }
}
