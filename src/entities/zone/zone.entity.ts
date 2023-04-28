import { Entity, Column, Index, PrimaryColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IZone, ZoneType } from './types';
import { Polygon } from 'geojson';
import { IOrganisation, Organisation } from '../organisation';

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

  @ManyToOne(() => Organisation)
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
