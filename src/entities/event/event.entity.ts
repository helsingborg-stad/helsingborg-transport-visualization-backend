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

  @ManyToOne(() => Zone, (zone) => zone.events, { onDelete: 'CASCADE' })
  zone: IZone;
  @Column({ nullable: true })
  zoneId: string;

  @ManyToOne(() => Zone, (zone) => zone.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'distributionZoneId' })
  distributionZone: Zone;
  @Column({ nullable: true })
  distributionZoneId: string;

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
