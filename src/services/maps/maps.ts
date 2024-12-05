import { Client, TravelMode, UnitSystem } from '@googlemaps/google-maps-services-js';
import { IMaps } from './types';

export class Maps implements IMaps {
    private client: Client;

    constructor() {
        this.client = new Client({});
    }

    async getDistance(origin: string, destination: string): Promise<number> {
        const response = await this.client.distancematrix({
           params: {
            origins: [origin],
            destinations: [destination],
            units: UnitSystem.metric,
            mode: TravelMode.driving,
            client_id: '',
            client_secret: '',
           }
        });

        return response.data.rows[0].elements[0].distance.value;
    }
}