import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IUser {
  id: number;
  email: string;
  password?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiration?: Date;
  createdAt: Date;
  updatedAt?: string;
}

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

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
  updatedAt?: string;

  constructor(email: string) {
    this.email = email;
  }
}
