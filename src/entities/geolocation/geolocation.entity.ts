import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IGeolocation } from './types';
import { IUser, User } from '../user';

@Entity('geolocations')
export class Geolocation implements IGeolocation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  userId: number;

  @ManyToOne(() => User)
  user: IUser;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  heading: number;

  @Column()
  registeredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(latitude: number, longitude: number, heading: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.heading = heading;
  }
}
