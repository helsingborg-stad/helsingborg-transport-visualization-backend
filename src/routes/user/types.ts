export type CreateAdminBody = {
  email: string;
  password: string;
  freightCompanyId?: number;
};

export type CreateDriverBody = {
  email: string;
  password: string;
  freightCompanyId: number;
};
