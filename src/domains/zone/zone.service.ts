import { Zone, FeatureCollection } from '@root/entities';
import { IZoneRepository, ZoneRepository } from '@root/repositories';
import { ZoneCreateType } from './types';

export interface IZoneService {
  getAllZones: () => Promise<FeatureCollection>;
  createZones: (zones: ZoneCreateType) => Promise<void>;
  getZonesByOrgId: (orgId: string) => Promise<FeatureCollection>;
}

export class ZoneService implements IZoneService {
  constructor(private repo: IZoneRepository = new ZoneRepository()) {}

  async getAllZones(): Promise<FeatureCollection> {
    return this.repo.getAllZones();
  }

  async createZones(zones: ZoneCreateType): Promise<void> {
    const zonesToSave = zones.features.map((zone) => {
      const newZone = new Zone(zone.geometry, zone.properties.organisationId);
      newZone.name = zone.properties.name;
      newZone.address = zone.properties.address;
      newZone.area = zone.properties.area;

      newZone.type = zone.properties.type;
      newZone.organisationId = zone.properties.organisationId;
      return newZone;
    });
    return this.repo.saveAll(zonesToSave);
  }

  async getZonesByOrgId(orgId: string): Promise<FeatureCollection> {
    return this.repo.findByOrgId(orgId);
  }
}
