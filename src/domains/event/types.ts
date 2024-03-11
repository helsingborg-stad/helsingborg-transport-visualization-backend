export type FilterQueries = {
  names?: string[];
  organisations?: string[];
  areas?: string[];
  weekdays?: string[];
  distributors?: string[];
  from?: string;
  to?: string;
  timeInterval?: string[];
};

export type CreateEventBody = {
  trackingId: string;
  sessionId?: string;
  deviceId?: string;
  distributionZoneId: string;
  enteredAt: Date;
  exitedAt: Date;
};
