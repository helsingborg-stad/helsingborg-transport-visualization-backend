export interface IMaps {
    getDistance: (origin: string, destination: string) => Promise<number>;
}