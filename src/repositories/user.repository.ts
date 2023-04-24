import { Repository } from 'typeorm';
import { IUser, User, UserResponse } from '@root/entities';
import { buildRepository } from '@root/services/database';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<IUser | null>;
  findById: (id: number) => Promise<IUser | null>;
  save: (user: IUser) => Promise<IUser>;
  getAllUsers: () => Promise<UserResponse[]>;
}

export class UserRepository implements IUserRepository {
  constructor(private repo: Repository<IUser> = buildRepository<IUser>(User)) {}
  async findByEmail(email: string): Promise<IUser | null> {
    return this.repo.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  async save(user: IUser): Promise<IUser> {
    return this.repo.save(user);
  }

  async findById(id: number): Promise<IUser | null> {
    return this.repo.findOne({ where: { id } });
  }
  async getAllUsers(): Promise<UserResponse[]> {
    return this.repo.find(
      {
        select: ['id', 'userType', 'email', 'createdAt', 'updatedAt']
      }
    )
  }
}
