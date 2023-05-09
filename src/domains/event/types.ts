export type FilterQueries = {
  names?: string[];
  orgNumbers?: string[];
  areas?: string[];
};

export type CreateEventBody = {
  trackingId: string;
  enteredAt: Date;
  exitedAt: Date;
};
