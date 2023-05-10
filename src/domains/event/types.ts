export type FilterQueries = {
  names?: string[];
  orgNumbers?: string[];
  areas?: string[];
  weekdays?: string[];
};

export type CreateEventBody = {
  trackingId: string;
  distributionZoneId: string;
  enteredAt: Date;
  exitedAt: Date;
};
