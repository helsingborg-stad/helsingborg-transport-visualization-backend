export type FilterQueries = {
  names?: string[];
  orgNumbers?: string[];
  areas?: string[];
  weekdays?: string[];
};

export type CreateEventBody = {
  trackingId: string;
  enteredAt: Date;
  exitedAt: Date;
};
