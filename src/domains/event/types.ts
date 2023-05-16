export type FilterQueries = {
  names?: string[];
  organisations?: string[];
  areas?: string[];
  weekdays?: string[];
  distributors?: string[];
};

export type CreateEventBody = {
  trackingId: string;
  distributionZoneId: string;
  enteredAt: Date;
  exitedAt: Date;
};
