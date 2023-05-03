import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { IOrganisation } from './types';
import { compareHashedValue, hashValue } from '@utils/hash';
import { createJWT } from '@root/services/jwt';
import randomTokenGenerator from '@utils/radomTokenGenerator';
import { addDays } from '@utils/date';
import { Zone, IZone } from '../zone';

@Entity('organisations')
export class Organisation implements IOrganisation {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  orgNumber: string;

  @Column({ unique: true })
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

  @OneToMany(() => Zone, (zone) => zone)
  zones: IZone[];

  constructor(orgNumber: string, email: string, name: string) {
    this.orgNumber = orgNumber;
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

  public async buildToken(isPasswordAuthenticated: boolean): Promise<string> {
    return createJWT({
      id: this.id,
      orgNumber: this.orgNumber,
      email: this.email,
      name: this.name,
      isPasswordAuthenticated,
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
