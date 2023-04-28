import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { IOrganisation } from './types';
import { compareHashedValue, hashValue } from '@utils/hash';
import { createJWT } from '@root/services/jwt';
import randomTokenGenerator from '@utils/radomTokenGenerator';
import { addDays } from '@utils/date';

@Entity('organisations')
export class Organisation implements IOrganisation {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  pinCode: string;

  @Column()
  forgotPasswordToken?: string;

  @Column()
  forgotPasswordTokenExpiration?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  public async setPassword(password: string): Promise<void> {
    this.password = await hashValue(password);
  }

  public async setPinCode(pinCode: string): Promise<void> {
    this.pinCode = await hashValue(pinCode);
  }

  public async isPasswordValid(passwordToCompare: string): Promise<boolean> {
    return compareHashedValue(passwordToCompare, this.password);
  }

  public async isPinCodeValid(pinCodeToCompare: string): Promise<boolean> {
    return compareHashedValue(pinCodeToCompare, this.pinCode);
  }

  public async buildToken(): Promise<string> {
    return createJWT({
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
    });
  }

  public setForgotPasswordToken(expirationDays: number = 1): void {
    this.forgotPasswordToken = randomTokenGenerator();
    this.forgotPasswordTokenExpiration = addDays(expirationDays);
  }

  public clearForgotPasswordToken(): void {
    this.forgotPasswordToken = null;
    this.forgotPasswordTokenExpiration = null;
  }
}
