import { Client, LatLng, TravelMode, UnitSystem } from '@googlemaps/google-maps-services-js';
import { IMaps } from './types';
import { config } from '@config'

export class Maps implements IMaps {
    private client: Client;

    constructor() {
        this.client = new Client({});
    }

    async getDistance(origin: LatLng, destination: LatLng): Promise<number> {
        const response = await this.client.distancematrix({
           params: {
            origins: [origin],
            destinations: [destination],
            units: UnitSystem.metric,
            mode: TravelMode.driving,
            key: config.googleMapsApiKey
           }
        });

        return response.data.rows[0].elements[0].distance.value;
    }
}