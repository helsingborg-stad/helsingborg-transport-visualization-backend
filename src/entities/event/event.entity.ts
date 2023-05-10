import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IEvent } from './types';
import { IZone, Zone, ZoneType } from '../zone';

@Entity('events')
export class Event implements IEvent {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column()
  trackingId: string;

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

  @ManyToOne(() => Zone)
  @JoinColumn({ name: 'distributionZoneId' })
  distributionZone: IZone;
  @Column({ nullable: true })
  distributionZoneId: string;

  //create a connection from event to zone to organisation

  constructor(trackingId: string, enteredAt: Date, exitedAt: Date) {
    this.trackingId = trackingId;
    this.enteredAt = enteredAt;
    this.exitedAt = exitedAt;
  }

  setZone(zone: IZone): void {
    this.zoneId = zone.id;
    this.zoneType = zone.type;
    this.address = zone.address;
    this.name = zone.name;
    this.area = zone.area;
  }
}
