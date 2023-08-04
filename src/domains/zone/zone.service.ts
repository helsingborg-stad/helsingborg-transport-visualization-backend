import { Zone, FeatureCollection } from '@root/entities';
import { IZoneRepository, ZoneRepository } from '@root/repositories';
import { ZoneCreateType } from './types';
import StatusError from '@root/utils/statusError';

export interface IZoneService {
  getAllZones: () => Promise<FeatureCollection>;
  createZones: (zones: ZoneCreateType, orgId: string) => Promise<void>;
  getZonesByOrgId: (orgId: string) => Promise<FeatureCollection>;
  getDeliveryZones: (zoneId: string) => Promise<FeatureCollection>;
  getDistributionZones: (zoneId: string) => Promise<FeatureCollection>;
  deleteZone: (zoneId: string, userId: string) => Promise<void>;
}

export class ZoneService implements IZoneService {
  constructor(private repo: IZoneRepository = new ZoneRepository()) {}

  async getAllZones(): Promise<FeatureCollection> {
    return this.repo.getAllZones();
  }

  async createZones(zones: ZoneCreateType, orgId: string): Promise<void> {
    const zonesToSave = zones.features.map((zone) => {
      const newZone = new Zone(zone.geometry, zone.properties.organisationId);
      newZone.name = zone.properties.name;
      newZone.address = zone.properties.address;
      newZone.area = zone.properties.area;
      newZone.type = zone.properties.type;
      newZone.organisationId = orgId;
      newZone.lat = zone.properties.lat;
      newZone.lng = zone.properties.lng;
      return newZone;
    });
    try {
      return await this.repo.saveAll(zonesToSave);
    } catch (err) {
      throw new StatusError(400, 'Zone already exists');
    }
  }

  async getZonesByOrgId(orgId: string): Promise<FeatureCollection> {
    const zones = await this.repo.findByOrgId(orgId);
    if (!zones.features) {
      zones.features = [];
    }
    return zones;
  }

  async getDeliveryZones(zoneId: string): Promise<FeatureCollection> {
    const zone = await this.repo.getZoneById(zoneId);
    if (!zone) {
      throw new StatusError(404, 'Zones not found');
    }
    return this.repo.getDeliveryZones(zoneId);
  }

  async getDistributionZones(zoneId: string): Promise<FeatureCollection> {
    const zone = await this.repo.getZoneById(zoneId);
    if (!zone) {
      throw new StatusError(404, 'Zones not found');
    }

    return this.repo.getDistributionZones(zoneId);
  }

  async deleteZone(zoneId: string, userId: string): Promise<void> {
    const zone = await this.repo.getZoneById(zoneId);
    if (!zone) {
      throw new StatusError(404, 'Zone not found');
    }
    if (zone.organisationId !== userId) {
      throw new StatusError(401, 'Not authorized');
    }
    await this.repo.deleteZone(zoneId);
  }
}
