import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IFreightCompany } from './types';

@Entity('freight_companies')
export class FreightCompany implements IFreightCompany {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(name: string) {
    this.name = name;
  }
}
