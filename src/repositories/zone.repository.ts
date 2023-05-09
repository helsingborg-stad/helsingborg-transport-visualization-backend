import { Repository } from 'typeorm';
import { IZone, Zone, FeatureCollection } from '@root/entities';
import { buildRepository } from '@root/services/database';

export interface IZoneRepository {
  findByOrgId: (orgId: string) => Promise<FeatureCollection>;
  saveAll: (zones: IZone[]) => Promise<void>;
  getAllZones: () => Promise<FeatureCollection>;
  getZoneById: (id: string) => Promise<IZone>;
}

export class ZoneRepository implements IZoneRepository {
  constructor(private repo: Repository<IZone> = buildRepository<IZone>(Zone)) {}

  async findByOrgId(orgId: string): Promise<FeatureCollection> {
    return this.repo.query(`
    SELECT json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(ST_AsGeoJSON(t.*)::json)
    )
    FROM (
      SELECT
        id,
        name,
        address,
        area,
        type,
        organisationId,
        polygon
      FROM zone
      WHERE organisationId = '${orgId}'
    ) t;
    `);
  }

  async saveAll(zones: IZone[]): Promise<void> {
    await this.repo.save(zones);
  }

  async getAllZones(): Promise<FeatureCollection> {
    const result = await this.repo.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      )
      FROM (
        SELECT
          id,
          name,
          address,
          area,
          type,
          "organisationId",
          polygon
        FROM zones
      ) t;
    `);
    return result[0].json_build_object;
  }

  async getZoneById(id: string): Promise<IZone> {
    return this.repo.findOneOrFail({
      where: { id },
    });
  }
}
