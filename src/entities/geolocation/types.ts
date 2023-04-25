export interface IGeolocation {
  id: number;
  userId: number;
  latitude: number;
  longitude: number;
  heading: number;
  registeredAt: Date;
  createdAt: Date;
  updatedAt?: Date;
}
