export type AdminCreateType = {
  email: string;
  password: string;
  freightCompanyId?: number;
};

export type DriverCreateType = {
  email: string;
  password: string;
  freightCompanyId: number;
};
