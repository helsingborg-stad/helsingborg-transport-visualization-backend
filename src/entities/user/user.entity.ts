import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserTypes, IUser } from './types';
import { compareHashedValue, hashValue } from '@utils/hash';
import { createJWT } from '@root/services/jwt';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    enum: UserTypes,
  })
  userType: UserTypes;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column()
  forgotPasswordToken?: string;

  @Column()
  forgotPasswordTokenExpiration?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(email: string) {
    this.email = email;
  }

  public async setPassword(password: string): Promise<void> {
    this.password = await hashValue(password);
  }

  public async isPasswordValid(passwordToCompare: string): Promise<boolean> {
    return compareHashedValue(passwordToCompare, this.password);
  }
  public async buildToken(): Promise<string> {
    return createJWT({
      id: this.id,
      email: this.email,
      userType: this.userType,
      createdAt: this.createdAt,
    });
  }
}
