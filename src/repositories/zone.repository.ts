import { Repository } from 'typeorm';
import { IZone, Zone, FeatureCollection } from '@root/entities';
import { buildRepository } from '@root/services/database';

export interface IZoneRepository {
  findByOrgId: (orgId: string) => Promise<FeatureCollection>;
  save: (zones: IZone[]) => Promise<void>;
  getAllZones: () => Promise<FeatureCollection>;
  getZoneById: (id: string) => Promise<IZone>;
  getTransformedZoneById: (id: string) => Promise<FeatureCollection>;
  getDeliveryZones: (zoneId: string) => Promise<FeatureCollection>;
  getDistributionZones: (zoneId: string) => Promise<FeatureCollection>;
  deleteZone: (zoneId: string) => Promise<void>;
}

export class ZoneRepository implements IZoneRepository {
  constructor(private repo: Repository<IZone> = buildRepository<IZone>(Zone)) { }

  async findByOrgId(orgId: string): Promise<FeatureCollection> {
    const result = await this.repo.query(`
    SELECT json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(ST_AsGeoJSON(t.*)::json)
    )
      FROM (
        SELECT
          id,
          gln,
          name,
          address,
          area,
          type,
          polygon,
          lat,
          lng,
          (
            SELECT json_build_object(
              'id', id,
              'gln', gln,
              'orgNumber', "orgNumber",
              'name', name,
              'email', email,
              'createdAt', "createdAt",
              'updatedAt', "updatedAt",
              'mobileNumber', "mobileNumber",
              'contactPerson', "contactPerson"
              ) AS "organisation" FROM organisations WHERE id = "organisationId"
          )
        FROM zones
      WHERE "organisationId" = $1
    ) t;
    `, [orgId]);
    return result[0].json_build_object;
  }

  async save(zones: IZone[]) {
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
          gln,
          name,
          address,
          area,
          type,
          polygon,
          lat,
          lng,
          (
            SELECT json_build_object(
              'id', id,
              'gln', gln,
              'orgNumber', "orgNumber",
              'name', name,
              'email', email,
              'createdAt', "createdAt",
              'updatedAt', "updatedAt",
              'mobileNumber', "mobileNumber",
              'contactPerson', "contactPerson"
              ) AS "organisation" FROM organisations WHERE id = "organisationId"
          )
        FROM zones
      ) t;
    `);
    return result[0].json_build_object;
  }

  async getTransformedZoneById(id: string): Promise<FeatureCollection> {
    const result = await this.repo.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      )
      FROM (
        SELECT
          id,
          gln,
          name,
          address,
          area,
          type,
          polygon,
          lat,
          lng,
          (
            SELECT json_build_object(
              'id', id,
              'gln', gln,
              'orgNumber', "orgNumber",
              'name', name,
              'email', email,
              'createdAt', "createdAt",
              'updatedAt', "updatedAt",
              'mobileNumber', "mobileNumber",
              'contactPerson', "contactPerson"
              ) AS "organisation" FROM organisations WHERE id = "organisationId"
          )
        FROM zones
        WHERE id = $1
      ) t;
    `, [id]);
    return result[0].json_build_object;
  }

  async getZoneById(id: string): Promise<IZone> {
    return this.repo.findOne({
      where: { id },
      relations: ['organisation'],
    });
  }

  async getDeliveryZones(zoneId: string): Promise<FeatureCollection> {
    const result = await this.repo.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      )
      FROM (
        SELECT
          id,
          gln,
          name,
          address,
          area,
          type,
          polygon,
          lat,
          lng,
          (
            SELECT json_build_object(
              'id', id,
              'gln', gln,
              'orgNumber', "orgNumber",
              'name', name,
              'email', email,
              'createdAt', "createdAt",
              'updatedAt', "updatedAt",
              'mobileNumber', "mobileNumber",
              'contactPerson', "contactPerson"
              ) AS "organisation" FROM organisations WHERE id = "organisationId"
          )
        FROM zones
        WHERE id IN (
          SELECT "zoneId"
          FROM events
          WHERE "distributionZoneId" = '${zoneId}'
        )
      ) t;
    `);
    return result[0].json_build_object;
  }

  async getDistributionZones(zoneId: string): Promise<FeatureCollection> {
    const result = await this.repo.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
      )
      FROM (
        SELECT
          id,
          gln,
          name,
          address,
          area,
          type,
          polygon,
          lat,
          lng,
          (
            SELECT json_build_object(
              'id', id,
              'gln', gln,
              'orgNumber', "orgNumber",
              'name', name,
              'email', email,
              'createdAt', "createdAt",
              'updatedAt', "updatedAt",
              'mobileNumber', "mobileNumber",
              'contactPerson', "contactPerson"
              ) AS "organisation" FROM organisations WHERE id = "organisationId"
          )
        FROM zones
        WHERE id IN (
          SELECT "distributionZoneId"
          FROM events
          WHERE "zoneId" = $1
        )
      ) t;
    `, [zoneId]);
    return result[0].json_build_object;
  }

  async deleteZone(zoneId: string): Promise<void> {
    await this.repo.delete({ id: zoneId });
  }
}
