import { LatLng } from '@googlemaps/google-maps-services-js';

export interface IMaps {
    getDistance: (origin: LatLng, destination: LatLng) => Promise<number>;
}