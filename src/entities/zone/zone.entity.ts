import { Entity, Column, Index, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IZone, ZoneType } from './types';
import { Polygon } from 'geojson';
import { IOrganisation, Organisation } from '../organisation';
import { IEvent, Event } from '../event';

@Entity('zones')
export class Zone implements IZone {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  area: string;

  @Column({
    type: 'varchar',
    enum: ZoneType,
  })
  type: ZoneType;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: false,
  })
  polygon: Polygon;

  @OneToMany(() => Event, (event) => event)
  events: IEvent[];

  @ManyToOne(() => Organisation, (organisation) => organisation.zones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organisationId' })
  organisation: IOrganisation;
  @Column()
  organisationId: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(polygon: Polygon, organisationId: string) {
    this.polygon = polygon;
    this.organisationId = organisationId;
  }
}
