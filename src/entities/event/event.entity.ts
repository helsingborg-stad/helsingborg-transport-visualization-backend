import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IEvent } from './types';
import { IZone, Zone, ZoneType } from '../zone';

@Entity('events')
export class Event implements IEvent {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column()
  orgNumber: string;

  @Column({
    type: 'varchar',
    enum: ZoneType,
  })
  zoneType: ZoneType;

  @Column()
  address: string;

  @Column()
  name: string;

  @Column()
  area: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  enteredAt: Date;

  @Column()
  exitedAt: Date;

  @ManyToOne(() => Zone)
  zone: IZone;
  @Column({ nullable: true })
  zoneId: string;

  constructor(orgNumber: string, zoneType: ZoneType, zoneId: string) {
    this.orgNumber = orgNumber;
    this.zoneType = zoneType;
    this.zoneId = zoneId;
  }
}
